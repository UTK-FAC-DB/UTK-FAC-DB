import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MetricsPostcranTableDataSource, MetricsPostcranTableItem } from './metrics-postcran-table-datasource';

@Component({
  selector: 'app-metrics-postcran-table',
  templateUrl: './metrics-postcran-table.component.html',
  styleUrls: ['./metrics-postcran-table.component.css']
})
export class MetricsPostcranTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<MetricsPostcranTableItem>;
  dataSource: MetricsPostcranTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new MetricsPostcranTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
