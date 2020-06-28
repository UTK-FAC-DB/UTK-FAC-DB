import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { InventoryCremationTableDataSource } from './inventory-cremation-table-datasource';
import { MatAccordion } from '@angular/material/expansion';
import { CremationInventory } from 'src/app/Exports/inventory/cremation.model';
import { SelectionModel } from '@angular/cdk/collections';
import { CremationService } from 'src/app/Services/inventory/cremation.service';
import { ExportCSVService } from 'src/app/Services/Utility/export-csv.service';

@Component({
  selector: 'app-inventory-cremation-table',
  templateUrl: './inventory-cremation-table.component.html',
  styleUrls: ['./inventory-cremation-table.component.css']
})
export class InventoryCremationTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<CremationInventory>;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  dataSource: any
  selection = new SelectionModel<CremationInventory>(true, []);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'utid', 'donatedby', 'actions'];

  constructor(private cremationService: CremationService, private exportService: ExportCSVService) {}

  ngOnInit() {
    this.dataSource = new InventoryCremationTableDataSource(this.cremationService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onDelete(selected: CremationInventory[]): void {
    this.cremationService.deleteItems(selected);
  }
  onSingleDelete(id: string): void {
    this.cremationService.deleteItem(id);
  }
  applyFilter(event: Event): void {
    const filter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filter.trim().toLowerCase();
  }
  onExport(selected: CremationInventory[]): void {
    this.exportService.downloadFile(selected, this.cremationHeaders);
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
  
  checkboxLabel(row?: CremationInventory): string {
    if (!row) {
      return '${this.isAllSelected() ? select : deselect} all';
    } else {
      return '${this.selection.isSelected(row) ? deselect : select} row ${row.position + 1}';
    }
  }

  cremationHeaders: string[] = [
    'UTID',
    'DateReceived',
    'ContactedBy',
    'ContactFacility',	
    'ContactDate',
    'DonatedBy',
    'Relationship',	
    'TotalWeight',
    'TotalWeightUnit',	
    'LabWeight',
    'InventoryWeightUnit',	
    'LabWeight',
    'CurrentLabWeightUnit',
    'LabWeight',
    'RemovedWeightUnit',	
    'CrematedRemainsProcess',
    'ProstheticsRemoved',
    'TagPlaced_By',
    'TagPlaced_Date',
    'ReleasedFromDept_By',
    'ReleasedFromDept_Date',	
    'ReceivedIntoCollection_By',	
    'ReceivedIntoCollection_date',
  ]
}
