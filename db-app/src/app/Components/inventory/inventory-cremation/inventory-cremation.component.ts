import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CremationService } from 'src/app/Services/inventory/cremation.service';
import { CremationInventory } from 'src/app/Exports/inventory/cremation.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-inventory-cremation',
  templateUrl: './inventory-cremation.component.html',
  styleUrls: ['./inventory-cremation.component.css']
})
export class InventoryCremationComponent implements OnInit, AfterViewInit {
  private mode = 'create';
  private itemId: string;
  item: CremationInventory;

  constructor(
    private fb: FormBuilder, 
    private cremationService: CremationService,
    private route: ActivatedRoute
  ) { }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('itemId')) {
        this.mode = 'edit'
        this.itemId = paramMap.get('itemId');
        this.item = this.cremationService.getItem(this.itemId);
        this.updateForm(this.item);
      } else {
        this.mode = 'create';
        this.itemId = null;
      }
    })
  }

  onSubmit() {
    if (this.mode === 'create') {
      this.cremationService.createItem(this.cremationForm.value);
    } else {
      this.cremationService.updateItem(this.itemId, this.cremationForm.value);
    }
  }

  cremationForm: FormGroup = this.createForm({
    id: '',
    Cremation_DBID: '',
    UTID: '',
    DateReceived: null,
    ContactedBy: '',
    ContactFacility: '',
    ContactDate: null,
    DonatedBy: '',
    Relationship: '',
    TotalWeight: null,
    TotalWeightUnit: '',
    LabWeight: null,
    InventoryWeightUnit: '',
    CurrentLabWeight: null,
    CurrentLabWeightUnit: '',	
    RemovedLabWeight: null,
    RemovedWeightUnit: '',
    CrematedRemainsProcess: '',
    ProstheticsRemoved: '',
    TagPlaced_By: '',
    TagPlaced_Date: null,
    ReleasedFromDept_By: '',
    ReleasedFromDept_Date: null,
    ReceivedIntoCollection_By: '',
    ReceivedIntoCollection_date: null
  })

  private createForm(model: CremationInventory): FormGroup {
    return this.fb.group(model);
  }
  private updateForm(model: Partial<CremationInventory>): void {
    this.cremationForm.patchValue(model);
  }

  get formValue() {
    return this.cremationForm.value as CremationInventory;
  }

}
