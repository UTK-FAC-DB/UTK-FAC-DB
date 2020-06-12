import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DonorTableDataSource } from './donor-table-datasource';
import { Donor } from 'src/app/Exports/donor';
import { DonorService } from 'src/app/Services/Donor/donor.service';
import { SelectionModel } from '@angular/cdk/collections';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { ExportCSVService } from 'src/app/Services/Utility/export-csv.service';
import { element } from 'protractor';
import { MatAccordion } from '@angular/material/expansion';
import { Globals } from 'src/app/globals';
import { Observable } from 'rxjs';
import {Filters} from 'src/app/Exports/filters';

export interface Types {
  view: string;
  value: string;
}

@Component({
  selector: 'app-donor-table',
  templateUrl: './donor-table.component.html',
  styleUrls: ['./donor-table.component.css']
})
export class DonorTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Donor>;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  filterArr: Array<string> = [];
  dataSource: any;
  selection = new SelectionModel<Donor>(true, []);
  filterPanelState: boolean =  false;
  displayedColumns = ['select', 'firstName', 'lastName', 'dob', 'actions'];
  filters: Filters;
  hairToggle: boolean = false;

  
  constructor(private formBuilder: FormBuilder, private donorService: DonorService, private exportService: ExportCSVService, private global : Globals) {}
  
  ngOnInit() {
    this.dataSource = new DonorTableDataSource(this.donorService);
  }

  filterForm: FormGroup = this.createForm({
    hairColor: [],
    selectedRace: [],
    selectedSex: [],
    bloodType: [],
    ageControl: []
  });

  private createForm(model: Filters): FormGroup {
    return this.formBuilder.group(model);
  }

  private updateForm(model: Partial<Filters>): void {
    this.filterForm.patchValue(model);
  }

  get formValue() {
    return this.filterForm.value as Filters;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  
  onDelete(selectedDonors: Donor[]): void {
    this.donorService.deleteDonor(selectedDonors);
    this.selection.clear();
  }
  onSingleDelete(id: string): void {
    this.donorService.deleteSingleDonor(id);
  }

  onExport(selectedDonors: Donor[]): void {
    this.exportService.downloadFile(selectedDonors, this.global.donorHeaders);
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
  
  checkboxLabel(row?: Donor): string {
    if (!row) {
      return '${this.isAllSelected() ? select : deselect} all';
    } else {
      return '${this.selection.isSelected(row) ? deselect : select} row ${row.position + 1}';
    }
  }
  
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  onApplyFilters(): void {
    this.dataSource.multipleFilter = this.filterForm.value as Filters;
  }
  onResetFilters(): void {
    
  }

  toggleFunction(menu: string): void {
    let x = document.getElementById(menu);
    if (x.style.display === 'none') { x.style.display = 'block'; } 
    else { x.style.display = 'none'; }
  }

  hairType: Types[] = [
    {view: 'Black', value: 'blackhair'},
    {view: 'Brown', value: 'brownhair'},
    {view: 'Blonde', value: 'blondehair'},
    {view: 'Red', value: 'redhair'},
    {view: 'Gray', value: 'grayhair'},
    {view: 'Bald', value: 'baldhair'},
    {view: 'Other', value: 'otherhair'}
  ]
  sexType: Types[] = [
    {view: 'Male', value: 'male-0'},
    {view: 'Female', value: 'female-1'},
    {view: 'Non-binary', value: 'non-binary'}
  ]
  raceType: Types[] = [
    {view: 'White', value: 'whiterace'},
    {view: 'Black or African American', value: 'blackrace'},
    {view: 'American Indian', value: 'indianrace'},
    {view: 'Asian', value: 'asianrace'},
    {view: 'Hispanic or Latino', value: 'hispanicrace'},
    {view: 'Native Hawaiian or Other Pacific Islander', value: 'pacificrace'},
    {view: 'Two or more races', value: 'tworace'}
  ]
  bloodType: Types[] = [
    {view: 'AB+', value: 'ab+'},
    {view: 'AB-', value: 'ab-'},
    {view: 'A+', value: 'a+'},
    {view: 'A-', value: 'a-'},
    {view: 'B+', value: 'b+'},
    {view: 'B-', value: 'b-'},
    {view: 'O+', value: 'o+'},
    {view: 'O-', value: 'o-'}
  ]
}
