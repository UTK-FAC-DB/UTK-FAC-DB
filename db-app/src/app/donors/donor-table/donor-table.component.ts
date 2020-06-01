import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DonorTableDataSource } from './donor-table-datasource';
import { Donor } from '../donor';
import { DonorService } from '../donor.service';
import { SelectionModel } from '@angular/cdk/collections';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { ExportCSVService } from 'src/app/export2csv/export-csv.service';
import { element } from 'protractor';
import { MatAccordion } from '@angular/material/expansion';

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

  
  constructor(private formBuilder: FormBuilder, private donorService: DonorService, private exportService: ExportCSVService) {}
  
  ngOnInit() {
    this.dataSource = new DonorTableDataSource(this.donorService);
  }

  filterForm = this.formBuilder.group({
    hairToggle: new FormControl(''),
    hairControl: new FormControl([]),
    sexToggle: new FormControl(''),
    sexControl: new FormControl([]),
    raceToggle: new FormControl(''),
    raceControl: new FormControl([]),
    bloodToggle: new FormControl(''),
    bloodControl: new FormControl([]),
    ageRadio: new FormControl(''),
    exactAgeControl: new FormControl(''),
    rangeAgeControlUpper: new FormControl(''),
    rangeAgeControlLower: new FormControl('') 
  });
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  
  onDelete(selectedDonors: Donor[]): void {
    console.log("Deleting donors");
    console.log(selectedDonors[0]);
    this.donorService.deleteDonor(selectedDonors);
    this.selection.clear();
  }

  onExport(selectedDonors: Donor[]): void {
    console.log("Exporting donors");
    console.log(selectedDonors[0]);
    this.exportService.downloadFile(selectedDonors, Donor);
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
    //Get the filter controls from the filter form, then for each value in the control array push it
    //onto the filter arr
    this.filterForm.get("hairControl").value.forEach(element => { this.filterArr.push(element); });
    this.filterForm.get("sexControl").value.forEach(element => { this.filterArr.push(element) });
    this.filterForm.get("raceControl").value.forEach(element => { this.filterArr.push(element); });
    this.filterForm.get("bloodControl").value.forEach(element => { this.filterArr.push(element); });

    if (this.filterForm.get('ageRadio').value == 'exact'
        && this.filterForm.get("exactAgeControl").value) {
      this.filterArr.push(this.filterForm.get("exactAgeControl").value + 'Age');
    } else if (this.filterForm.get('ageRadio').value == 'range'
                && this.filterForm.get("rangeAgeControlLower").value 
                && this.filterForm.get("rangeAgeControlUpper").value) {
      this.filterArr.push(this.filterForm.get('rangeAgeControlLower').value + 'AgeLower');
      this.filterArr.push(this.filterForm.get('rangeAgeControlUpper').value + 'AgeUpper');
      this.dataSource.rangeAge = true;
    }
    //Set the datasource multiple filter to the filter array, this will cause the datasource to update and
    //and run the multiple filter functions
    this.dataSource.multipleFilter = this.filterArr;

    //reset the filter array
    this.filterArr = [];
  }
  onResetFilters(): void {
    this.filterForm.get("hairToggle").setValue('');
    this.filterForm.get("hairControl").setValue([]);
    this.filterForm.get("sexToggle").setValue('');
    this.filterForm.get("sexControl").setValue([]);
    this.filterForm.get("raceToggle").setValue('');
    this.filterForm.get("raceControl").setValue([]);
    this.filterForm.get("bloodToggle").setValue('');
    this.filterForm.get("bloodControl").setValue([]);
    this.filterForm.get("ageRadio").setValue('');
    this.filterForm.get("exactAgeControl").setValue('');
    this.filterForm.get("rangeAgeControlLower").setValue('');
    this.filterForm.get("rangeAgeControlUpper").setValue('');
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
    {view: 'Male', value: 'male'},
    {view: 'Female', value: 'female'},
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
