import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, Subscription, BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { AdultInventory } from 'src/app/Exports/inventory/adult.model';
import { AdultService } from 'src/app/Services/inventory/adult.service';
import { _isNumberValue } from '@angular/cdk/coercion';
import {Filters} from 'src/app/Exports/filters';
import { isDefined } from '@angular/compiler/src/util';

const MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Data source for the DonorTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class InventoryAdultTableDataSource extends DataSource<AdultInventory> {
  private readonly _data: BehaviorSubject<AdultInventory[]> = new BehaviorSubject<AdultInventory[]>([]);

  /** Stream emitting render data to the table (depends on ordered data changes). */
  private readonly _renderData = new BehaviorSubject<AdultInventory[]>([]);

  /** Stream that emits when a new filter string is set on the data source. */
  private readonly _filter = new BehaviorSubject<string>('');

  private readonly _multipleFilter = new BehaviorSubject<Filters>(null);

  /** Used to react to internal changes of the paginator that are made by the data source itself. */
  private readonly _internalPageChanges = new Subject<void>();

  /**
   * Subscription to the changes that should trigger an update to the table's rendered rows, such
   * as filtering, sorting, pagination, or base data changes.
   */
  _renderChangesSubscription = Subscription.EMPTY;

  private dataSub: Subscription;

  /**
   * The filtered set of data that has been matched by the filter string, or all the data if there
   * is no filter. Useful for knowing the set of data the table represents.
   * For example, a 'selectAll()' function would likely want to select the set of filtered data
   * shown to the user rather than all the data.
   */
  filteredData: AdultInventory[];
  multipleFilteredData: AdultInventory[];
  rangeAge: boolean = false;

  /** Array of data that should be rendered by the table, where each object represents one row. */
  get data() { return this._data.value; }
  set data(data: AdultInventory[]) { this._data.next(data); }

  /**
   * Filter term that should be used to filter out objects from the data array. To override how
   * data objects match to this filter string, provide a custom function for filterPredicate.
   */
  get filter(): string { return this._filter.value; }
  set filter(filter: string) { this._filter.next(filter); }

  get multipleFilter(): Filters { return this._multipleFilter.value; }
  set multipleFilter(filters: Filters) { this._multipleFilter.next(filters); }

  /**
   * Instance of the MatSort directive used by the table to control its sorting. Sort changes
   * emitted by the MatSort will trigger an update to the table's rendered data.
   */
  get sort(): MatSort | null { return this._sort; }
  set sort(sort: MatSort|null) {
    this._sort = sort;
    this._updateChangeSubscription();
  }
  private _sort: MatSort|null;

  /**
   * Instance of the MatPaginator component used by the table to control what page of the data is
   * displayed. Page changes emitted by the MatPaginator will trigger an update to the
   * table's rendered data.
   *
   * Note that the data source uses the paginator's properties to calculate which page of data
   * should be displayed. If the paginator receives its properties as template inputs,
   * e.g. `[pageLength]=100` or `[pageIndex]=1`, then be sure that the paginator's view has been
   * initialized before assigning it to this data source.
   */
  get paginator(): MatPaginator | null { return this._paginator; }
  set paginator(paginator: MatPaginator|null) {
    this._paginator = paginator;
    this._updateChangeSubscription();
  }
  private _paginator: MatPaginator|null;

  /**
   * Data accessor function that is used for accessing data properties for sorting through
   * the default sortData function.
   * This default function assumes that the sort header IDs (which defaults to the column name)
   * matches the data's properties (e.g. column Xyz represents data['Xyz']).
   * May be set to a custom function for different behavior.
   * @param data Data object that is being accessed.
   * @param sortHeaderId The name of the column that represents the data.
   */
  sortingDataAccessor: ((data: AdultInventory, sortHeaderId: string) => string|number) =
      (data: AdultInventory, sortHeaderId: string): string|number => {
    const value = (data as {[key: string]: any})[sortHeaderId];

    if (_isNumberValue(value)) {
      const numberValue = Number(value);

      // Numbers beyond `MAX_SAFE_INTEGER` can't be compared reliably so we
      // leave them as strings. For more info: https://goo.gl/y5vbSg
      return numberValue < MAX_SAFE_INTEGER ? numberValue : value;
    }

    return value;
  }

  /**
   * Gets a sorted copy of the data array based on the state of the MatSort. Called
   * after changes are made to the filtered data or when sort changes are emitted from MatSort.
   * By default, the function retrieves the active sort and its direction and compares data
   * by retrieving data using the sortingDataAccessor. May be overridden for a custom implementation
   * of data ordering.
   * @param data The array of data that should be sorted.
   * @param sort The connected MatSort that holds the current sort state.
   */
  sortData: ((data: AdultInventory[], sort: MatSort) => AdultInventory[]) = (data: AdultInventory[], sort: MatSort): AdultInventory[] => {
    const active = sort.active;
    const direction = sort.direction;
    if (!active || direction == '') { return data; }

    return data.sort((a, b) => {
      let valueA = this.sortingDataAccessor(a, active);
      let valueB = this.sortingDataAccessor(b, active);

      // If both valueA and valueB exist (truthy), then compare the two. Otherwise, check if
      // one value exists while the other doesn't. In this case, existing value should come last.
      // This avoids inconsistent results when comparing values to undefined/null.
      // If neither value exists, return 0 (equal).
      let comparatorResult = 0;
      if (valueA != null && valueB != null) {
        // Check if one value is greater than the other; if equal, comparatorResult should remain 0.
        if (valueA > valueB) {
          comparatorResult = 1;
        } else if (valueA < valueB) {
          comparatorResult = -1;
        }
      } else if (valueA != null) {
        comparatorResult = 1;
      } else if (valueB != null) {
        comparatorResult = -1;
      }

      return comparatorResult * (direction == 'asc' ? 1 : -1);
    });
  }

  /**
   * Checks if a data object matches the data source's filter string. By default, each data object
   * is converted to a string of its properties and returns true if the filter has
   * at least one occurrence in that string. By default, the filter string has its whitespace
   * trimmed and the match is case-insensitive. May be overridden for a custom implementation of
   * filter matching.
   * @param data Data object used to check against the filter.
   * @param filter Filter string that has been set on the data source.
   * @returns Whether the filter matches against the data
   */
  filterPredicate: ((data: AdultInventory, filter: string) => boolean) = (data: AdultInventory, filter: string): boolean => {
    // Transform the data into a lowercase string of all property values.
    const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => {
      // Use an obscure Unicode character to delimit the words in the concatenated string.
      // This avoids matches where the values of two columns combined will match the user's query
      // (e.g. `Flute` and `Stop` will match `Test`). The character is intended to be something
      // that has a very low chance of being typed in by somebody in a text field. This one in
      // particular is "White up-pointing triangle with dot" from
      // https://en.wikipedia.org/wiki/List_of_Unicode_characters
      return currentTerm + (data as {[key: string]: any})[key] + '◬';
    }, '').toLowerCase();
    console.log(dataStr);
    // Transform the filter by converting it to lowercase and removing whitespace.
    const transformedFilter = filter.trim().toLowerCase();

    return dataStr.indexOf(transformedFilter) != -1;
  }

  constructor(private service: AdultService) {
    super();
    this.service.getItems();
    this.dataSub = this.service.getItemUpdateListener()
      .subscribe((data: AdultInventory[]) => {
        this.data = data;
      })
    //this._data = new BehaviorSubject<Donor[]>(EXAMPLE_DATA);
    this._updateChangeSubscription();
  }

  /**
   * Subscribe to changes that should trigger an update to the table's rendered rows. When the
   * changes occur, process the current state of the filter, sort, and pagination along with
   * the provided base data and send it to the table for rendering.
   */
  _updateChangeSubscription() {
    // Sorting and/or pagination should be watched if MatSort and/or MatPaginator are provided.
    // The events should emit whenever the component emits a change or initializes, or if no
    // component is provided, a stream with just a null event should be provided.
    // The `sortChange` and `pageChange` acts as a signal to the combineLatests below so that the
    // pipeline can progress to the next step. Note that the value from these streams are not used,
    // they purely act as a signal to progress in the pipeline.
    const sortChange: Observable<Sort|null|void> = this._sort ?
        merge(this._sort.sortChange, this._sort.initialized) as Observable<Sort|void> :
        observableOf(null);
    const pageChange: Observable<PageEvent|null|void> = this._paginator ?
        merge(
          this._paginator.page,
          this._internalPageChanges,
          this._paginator.initialized
        ) as Observable<PageEvent|void> :
        observableOf(null);
    const dataStream = this._data;
    const multipleFilteredData = combineLatest([dataStream, this._multipleFilter])
      .pipe(map(([data]) => this._multipleFilterData(data)));
    // Watch for base data or filter changes to provide a filtered set of data.
    const filteredData = combineLatest([multipleFilteredData, this._filter])
      .pipe(map(([data]) => this._filterData(data)));
    // Watch for filtered data or sort changes to provide an ordered set of data.
    const orderedData = combineLatest([filteredData, sortChange])
      .pipe(map(([data]) => this._orderData(data)));
    // Watch for ordered data or page changes to provide a paged set of data.
    const paginatedData = combineLatest([orderedData, pageChange])
      .pipe(map(([data]) => this._pageData(data)));
    // Watched for paged data changes and send the result to the table to render.
    this._renderChangesSubscription.unsubscribe();
    this._renderChangesSubscription = paginatedData.subscribe(data => this._renderData.next(data));
  }

  /**
   * Returns a filtered data array where each filter object contains the filter string within
   * the result of the filterTermAccessor function. If no filter is set, returns the data array
   * as provided.
   */
  _filterData(data: AdultInventory[]) {
    // If there is a filter string, filter out data that does not contain it.
    // Each data object is converted to a string using the function defined by filterTermAccessor.
    // May be overridden for customization.
    this.filteredData =
        !this.filter ? data : data.filter(obj => this.filterPredicate(obj, this.filter));

    if (this.paginator) { this._updatePaginator(this.filteredData.length); }

    return this.filteredData;
  }

  _multipleFilterData(data: AdultInventory[]): AdultInventory[] {
    let count = 0;
    let check = 0;
    if (this.multipleFilter) {
      this.multipleFilteredData = data.filter(donor => {
        for (let key in this.multipleFilter) {
          if (this.multipleFilter[key]) {
            count++;
            if (Array.isArray(this.multipleFilter[key])) {
              for (let index in this.multipleFilter[key]) {
                if (isDefined(donor[key][index]) && donor[key] == this.multipleFilter[key][index]) { 
                  check++; 
                }
              }
            } else {
              if (isDefined(donor[key]) && donor[key] == this.multipleFilter[key]) { check++; }
            }
          }
        }
        if (check === count) { return true; } 
        else { return false; }
      })
    } else {
      this.multipleFilteredData = data;
    }

    if (this.paginator) { this._updatePaginator(this.multipleFilteredData.length); }
    return this.multipleFilteredData;
  }

  /**
   * Returns a sorted copy of the data if MatSort has a sort applied, otherwise just returns the
   * data array as provided. Uses the default data accessor for data lookup, unless a
   * sortDataAccessor function is defined.
   */
  _orderData(data: AdultInventory[]): AdultInventory[] {
    // If there is no active sort or direction, return the data without trying to sort.
    if (!this.sort) { return data; }

    return this.sortData(data.slice(), this.sort);
  }

  /**
   * Returns a paged slice of the provided data array according to the provided MatPaginator's page
   * index and length. If there is no paginator provided, returns the data array as provided.
   */
  _pageData(data: AdultInventory[]): AdultInventory[] {
    if (!this.paginator) { return data; }

    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.slice(startIndex, startIndex + this.paginator.pageSize);
  }

  /**
   * Updates the paginator to reflect the length of the filtered data, and makes sure that the page
   * index does not exceed the paginator's last page. Values are changed in a resolved promise to
   * guard against making property changes within a round of change detection.
   */
  _updatePaginator(filteredDataLength: number) {
    Promise.resolve().then(() => {
      const paginator = this.paginator;

      if (!paginator) { return; }

      paginator.length = filteredDataLength;

      // If the page index is set beyond the page, reduce it to the last page.
      if (paginator.pageIndex > 0) {
        const lastPageIndex = Math.ceil(paginator.length / paginator.pageSize) - 1 || 0;
        const newPageIndex = Math.min(paginator.pageIndex, lastPageIndex);

        if (newPageIndex !== paginator.pageIndex) {
          paginator.pageIndex = newPageIndex;

          // Since the paginator only emits after user-generated changes,
          // we need our own stream so we know to should re-render the data.
          this._internalPageChanges.next();
        }
      }
    });
  }

  /**
   * Used by the MatTable. Called when it connects to the data source.
   * @docs-private
   */
  connect() { return this._renderData; }

  /**
   * Used by the MatTable. Called when it is destroyed. No-op.
   * @docs-private
   */
  disconnect() { }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}