import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PostcranMetric } from 'src/app/Exports/metrics/postcran.model';
import { PostcranService } from 'src/app/Services/metrics/postcran.service'
import { MetricsPostcranTableDataSource } from './metrics-postcran-table-datasource';
import { MatAccordion } from '@angular/material/expansion';
import { SelectionModel } from '@angular/cdk/collections';
import { ExportCSVService } from 'src/app/Services/Utility/export-csv.service';

@Component({
  selector: 'app-metrics-postcran-table',
  templateUrl: './metrics-postcran-table.component.html',
  styleUrls: ['./metrics-postcran-table.component.css']
})
export class MetricsPostcranTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<PostcranMetric>;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  dataSource: any;
  selection = new SelectionModel<PostcranMetric>(true, []);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'utid', 'recorder', 'actions'];

  constructor(private postcranService
    : PostcranService, private exportService: ExportCSVService) {}
  
  ngOnInit() {
    this.dataSource = new MetricsPostcranTableDataSource(this.postcranService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  onDelete(selected: PostcranMetric[]): void {
    this.postcranService
    .deleteItems(selected);
  }
  onSingleDelete(id: string): void {
    this.postcranService
    .deleteItem(id);
  }
  applyFilter(event: Event): void {
    const filter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filter.trim().toLowerCase();
  }
  onExport(selected: PostcranMetric[]): void {
    this.exportService.downloadFile(selected, this.headers);
  }
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }
  
  masterToggle(): void {
    this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row));
  }
  
  checkboxLabel(row?: PostcranMetric): string {
    if (!row) {
      return '${this.isAllSelected() ? select : deselect} all';
    } else {
      return '${this.selection.isSelected(row) ? deselect : select} row ${row.position + 1}';
    }
  }

  headers: string[] = []
}
