import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DonorTableDataSource } from './donor-table-datasource';
import { Donor } from '../donor';
import { DonorService } from '../donor.service';

@Component({
  selector: 'app-donor-table',
  templateUrl: './donor-table.component.html',
  styleUrls: ['./donor-table.component.css']
})
export class DonorTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Donor>;
  dataSource: any;

  displayedColumns = ['firstName'];

  constructor(private donorService: DonorService) {}

  ngOnInit() {
    this.dataSource = new DonorTableDataSource(this.donorService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
