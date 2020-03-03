import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DonorTableDataSource } from './donor-table-datasource';
import { Donor } from '../donor';
import { DonorService } from '../donor.service';
import { SelectionModel } from '@angular/cdk/collections';

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
  selection = new SelectionModel<Donor>(true, []);

  displayedColumns = ['select', 'firstName', 'lastName', 'dob', 'actions'];

  constructor(private donorService: DonorService) {}

  ngOnInit() {
    this.dataSource = new DonorTableDataSource(this.donorService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onDelete(selectedDonors: Donor[]) {
    console.log("Deleting donors");
    this.donorService.deleteDonor(selectedDonors);
    this.selection.clear();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Donor): string {
    if (!row) {
      return '${this.isAllSelected() ? select : deselect} all';
    } else {
      return '${this.selection.isSelected(row) ? deselect : select} row ${row.position + 1}';
    }
  }
}
