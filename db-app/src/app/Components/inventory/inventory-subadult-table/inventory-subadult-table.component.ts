import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { InventorySubadultTableDataSource, InventorySubadultTableItem } from './inventory-subadult-table-datasource';

@Component({
  selector: 'app-inventory-subadult-table',
  templateUrl: './inventory-subadult-table.component.html',
  styleUrls: ['./inventory-subadult-table.component.css']
})
export class InventorySubadultTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<InventorySubadultTableItem>;
  dataSource: InventorySubadultTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new InventorySubadultTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
