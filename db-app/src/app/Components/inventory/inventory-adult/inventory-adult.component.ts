import { Component, OnInit } from '@angular/core';
import { AdultInventory } from 'src/app/Exports/inventory/adult.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdultService } from 'src/app/Services/inventory/adult.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-inventory-adult',
  templateUrl: './inventory-adult.component.html',
  styleUrls: ['./inventory-adult.component.css']
})
export class InventoryAdultComponent implements OnInit {
  private mode = 'create';
  private itemId: string;
  item: AdultInventory;

  constructor(
    private fb: FormBuilder,
    private adultService: AdultService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('itemId')) {
        console.log('editing');
        this.mode = 'edit';
        this.itemId = paramMap.get('itemId');
        this.item = this.adultService.getItem(this.itemId);
        this.updateForm(this.item);
      } else {
        this.mode = 'create';
        this.itemId = null;
      }
    })
  }

  onSubmit() {
    if (this.mode === 'create') {
      this.adultService.createItem(this.adultForm.value);
    } else {
      this.adultService.updateItem(this.itemId, this.adultForm.value);
    }
  }

  private createForm(model: AdultInventory): FormGroup {
    return this.fb.group(model);
  }
  private updateForm(model: Partial<AdultInventory>): void {
    this.adultForm.patchValue(model);
  }
  get formValue() {
    return this.adultForm.value as AdultInventory;
  }

  adultForm: FormGroup = this.createForm({
    id: '',
    UTID: '',
    Curator: '',
    Recorder: '',
    DateInventoried: null,
    Type: '',
    Condition: '',
    Autopsy: '',
    Cranium: '',
    Frontal: '',
    Parietal_L: '',
    Parietal_R: '',
    Occipital: '',
    Temporal_L: '',
    Temporal_R: '',
    Zygomatic_L: '',
    Zygomatic_R: '',
    Palatine_L: '',
    Palatine_R: '',
    Maxilla_L: '',
    Maxilla_R: '',
    Nasal_L: '',
    Nasal_R: '',
    Ethmoid: '',
    Lacrimal_L: '',
    Lacrimal_R: '',
    Vomer: '',
    Sphenoid: '',
    Mandible: '',
    Body_L: '',
    Body_R: '',
    Ramus_L: '',
    Ramus_R: '',
    Dentition: '',
    Upper_l: '',
    Upper_r: '',
    Max_i1_L: '',
    Max_i1_R: '',
    Max_i2_L: '',
    Max_i2_R: '',
    Max_Canine_L: '',
    Max_Canine_R: '',
    Max_PreM1_L: '',
    Max_PreM1_R: '',
    Max_PreM2_L: '',
    Max_PreM2_R: '',
    Max_M1_L: '',
    Max_M1_R: '',
    Max_M2_L: '',
    Max_M2_R: '',
    Max_M3_L: '',
    Max_M3_R: '',
    Lower_l: '',
    Lower_r: '',
    Mand_i1_L: '',
    Mand_i1_R: '',
    Mand_i2_L: '',
    Mand_i2_R: '',
    Mand_Canine_L: '',
    Mand_Canine_R: '',
    Mand_PreM1_L: '',
    Mand_PreM1_R: '',
    Mand_PreM2_L: '',
    Mand_PreM2_R: '',
    Mand_M1_L: '',
    Mand_M1_R: '',
    Mand_M2_L: '',
    Mand_M2_R: '',
    Mand_M3_L: '',
    Mand_M3_R: '',
    Postcranium: '',
    Hyoid: '',
    Clavicle_l: '',
    Clavicle_r: '',
    Scapula_l: '',
    Scapula_r: '',
    Humerus_l: '',
    Humerus_r: '',
    Radius_l: '',
    Radius_r: '',
    Ulna_l: '',
    Ulna_r: '',
    Manubrium: '',
    SternumBody: '',
    XiphoidProcess: '',
    Ilium_l: '',
    Ilium_r: '',
    Ischium_l: '',
    Ischium_r: '',
    Pubis_l: '',
    Pubis_r: '',
    Femur_l: '',
    Femur_r: '',
    Patella_l: '',
    Patella_r: '',
    Tibia_l: '',
    Tibia_r: '',
    Fibula_l: '',
    Fibula_r: '',
    Rib_1_l: '',
    Rib_1_r: '',
    Rib_2_l: '',
    Rib_2_r: '',
    Rib_3_10_l: '',
    Rib_3_10_l_Count: '',
    Rib_3_10_r: '',
    Rib_3_10_r_Count: '',
    Rib_11_l: '',
    Rib_11_r: '',
    Rib_12_l: '',
    Rib_12_r: '',
    Rib_frag_Count: '',
    Atlas: '',
    Axis: '',
    Cervical_3_7: '',
    Cervical_3_7_Count: '',
    Thoracic_1_12: '',
    Thoracic_1_12_Count: '',
    Lumbar_1_5: '',
    Lumbar_1_5_Count: '',
    C3: '',
    C4: '',
    C5: '',
    C6: '',
    C7: '',
    T1: '',
    T2: '',
    T3: '',
    T4: '',
    T5: '',
    T6: '',
    T7: '',
    T8: '',
    T9: '',
    T10: '',
    T11: '',
    T12: '',
    T13: '',
    L1: '',
    L2: '',
    L3: '',
    L4: '',
    L5: '',
    L6: '',
    Sacrum: '',
    Sacrum_Count: '',
    Coccyx: '',
    Coccyx_Count: '',
    Hand_l: '',
    Hand_r: '',
    Scaphoid_l: '',
    Scaphoid_r: '',
    Lunate_l: '',
    Lunate_r: '',
    Triquetral_l: '',
    Triquetral_r: '',
    Pisiform_l: '',
    Pisiform_r: '',
    GrMultangular_l: '',
    GrMultangular_r: '',
    LessMultangular_l: '',
    LessMultangular_r: '',
    Capitate_l: '',
    Capitate_r: '',
    Hamate_l: '',
    Hamate_r: '',
    Metacarpal1_l: '',
    Metacarpal2_l: '',
    Metacarpal3_l: '',
    Metacarpal4_l: '',
    Metacarpal5_l: '',
    Metacarpal1_r: '',
    Metacarpal2_r: '',
    Metacarpal3_r: '',
    Metacarpal4_r: '',
    Metacarpal5_r: '',
    Phalanges_Prox_Hand_Count: '',
    Phalanges_Mid_Hand_Count: '',
    Phalanges_Dist_Hand_Count: '',
    Foot_l: '',
    Foot_r: '',
    Calcaneus_l: '',
    Calcaneus_r: '',
    Talus_l: '',
    Talus_r: '',
    Cuboid_l: '',
    Cuboid_r: '',
    Navicular_l: '',
    Navicular_r: '',
    Cuneiform1_l: '',
    Cuneiform1_r: '',
    Cuneiform2_l: '',
    Cuneiform2_r: '',
    Cuneiform3_l: '',
    Cuneiform3_r: '',
    Metatarsals1_l: '',
    Metatarsals2_l: '',
    Metatarsals3_l: '',
    Metatarsals4_l: '',
    Metatarsals5_l: '',
    Metatarsals1_r: '',
    Metatarsals2_r: '',
    Metatarsals3_r: '',
    Metatarsals4_r: '',
    Metatarsals5_r: '',
    Phalanges_Prox_Foot_Count: '',
    Phalanges_Mid_Foot_Count: '',
    Phalanges_Dist_Foot_Count: '',
    Sesamoids: '',
    Thyroid: '',
    Cricoid: '',
    Prosthetic_Devices: '',
    Comments: ''
  });

}
