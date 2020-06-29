import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MetricsFullyTableDataSource, MetricsFullyTableItem } from './metrics-fully-table-datasource';

@Component({
  selector: 'app-metrics-fully-table',
  templateUrl: './metrics-fully-table.component.html',
  styleUrls: ['./metrics-fully-table.component.css']
})
export class MetricsFullyTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<MetricsFullyTableItem>;
  dataSource: MetricsFullyTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new MetricsFullyTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
