import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { FullyMetric } from 'src/app/Exports/metrics/fully.model';
import { FullyService } from 'src/app/Services/metrics/fully.service'
import { MetricsFullyTableDataSource } from './metrics-fully-table-datasource';
import { MatAccordion } from '@angular/material/expansion';
import { SelectionModel } from '@angular/cdk/collections';
import { ExportCSVService } from 'src/app/Services/Utility/export-csv.service';

@Component({
  selector: 'app-metrics-fully-table',
  templateUrl: './metrics-fully-table.component.html',
  styleUrls: ['./metrics-fully-table.component.css']
})
export class MetricsFullyTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<FullyMetric>;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  dataSource: any;
  selection = new SelectionModel<FullyMetric>(true, []);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'utid', 'recorder', 'actions'];

  constructor(private fullyService: FullyService, private exportService: ExportCSVService) {}
  
  ngOnInit() {
    this.dataSource = new MetricsFullyTableDataSource(this.fullyService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  onDelete(selected: FullyMetric[]): void {
    this.fullyService.deleteItems(selected);
  }
  onSingleDelete(id: string): void {
    this.fullyService.deleteItem(id);
  }
  applyFilter(event: Event): void {
    const filter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filter.trim().toLowerCase();
  }
  onExport(selected: FullyMetric[]): void {
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
  
  checkboxLabel(row?: FullyMetric): string {
    if (!row) {
      return '${this.isAllSelected() ? select : deselect} all';
    } else {
      return '${this.selection.isSelected(row) ? deselect : select} row ${row.position + 1}';
    }
  }
  headers: string[] = []
}
