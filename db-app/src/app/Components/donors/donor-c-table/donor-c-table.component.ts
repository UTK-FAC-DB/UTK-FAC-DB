import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DonorCTableDataSource} from './donor-c-table-datasource';
import { SelectionModel } from '@angular/cdk/collections';
import { Donor } from 'src/app/Exports/donor';
import { DonorService } from 'src/app/Services/Donor/controlDonor.service';

@Component({
  selector: 'app-donor-c-table',
  templateUrl: './donor-c-table.component.html',
  styleUrls: ['./donor-c-table.component.css']
})
export class DonorCTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Donor>;
  dataSource: DonorCTableDataSource;
  selection = new SelectionModel(true, []);

  /** Columns displayed in the table. **/
  displayedColumns = ['select', 'firstName', 'lastName'];

  constructor(private donorService: DonorService) {}

  ngOnInit() {
    this.dataSource = new DonorCTableDataSource(this.donorService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
