import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubadultService } from 'src/app/Services/inventory/subadult.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SubadultInventory } from 'src/app/Exports/inventory/subadult.model';

@Component({
  selector: 'app-inventory-subadult',
  templateUrl: './inventory-subadult.component.html',
  styleUrls: ['./inventory-subadult.component.css']
})
export class InventorySubadultComponent implements OnInit {
  private mode = 'create';
  private itemId: string;
  item: SubadultInventory;

  constructor(
    private fb: FormBuilder,
    private subadultService: SubadultService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('itemId')) {
        console.log('editing');
        this.mode = 'edit';
        this.itemId = paramMap.get('itemId');
        this.item = this.subadultService.getItem(this.itemId);
        this.updateForm(this.item);
      } else {
        this.mode = 'create';
        this.itemId = null;
      }
    })
  }
  onSubmit() {
    if (this.mode === 'create') {
      this.subadultService.createItem(this.subadultForm.value);
    } else {
      this.subadultService.updateItem(this.itemId, this.subadultForm.value);
    }
  }
  private createForm(model: SubadultInventory): FormGroup {
    return this.fb.group(model);
  }
  private updateForm(model: Partial<SubadultInventory>): void {
    this.subadultForm.patchValue(model);
  }
  get formValue() {
    return this.subadultForm.value as SubadultInventory;
  }

  subadultForm: FormGroup = this.createForm({
    id: '',
    UTID: '',
    Recorder: '',
    DateInventoried: null,
    Condition: '',
    Autopsy: '',
    Anc: '',
    Sex: '',
    Age: '',
    Cranium: '',
    Frontal_l: '',
    Frontal_r: '',
    Parietal_l: '',
    Parietal_r: '',
    Occipital_squama: '',
    Lateralis_L: '',
    Lateralis_r: '',
    Basilar: '',
    Temporal_squama_l: '',
    Temporal_squama_r: '',
    Petrous_l: '',
    Petrous_r: '',
    TympanicRing_l: '',
    TympanicRing_r: '',
    Hamulus_l: '',
    Hamulus_r: '',
    Stapes_l: '',
    Stapes_r: '',
    Incus_l: '',
    Incus_r: '',
    Malleus_l: '',
    Malleus_r: '',
    Zygomatic_l: '',
    Zygomatic_r: '',
    Palatine_l: '',
    Palatine_r: '',
    Maxilla_l: '',
    Maxilla_r: '',
    Nasal_l: '',
    Nasal_r: '',
    Sphenoid: '',
    pre_Sphenoid: '',
    Lesserwings_l: '',
    Lesserwings_r: '',
    greaterwings_l: '',
    greaterwings_r: '',
    Lacrimal_l: '',
    Lacrimal_r: '',
    Ethmoid_l: '',
    Ethmoid_r: '',
    Vomer: '',
    NasalConchae_l: '',
    NasalConchae_r: '',
    Mandible: '',
    Body_l: '',
    Body_r: '',
    Ramus_l: '',
    Ramus_r: '',
    Dentition: '',
    Upper_l: '',
    Upper_r: '',
    Max_i1_L: '',
    Max_i1_R: '',
    Max_i2_L: '',
    Max_i2_R: '',
    Max_Canine_L: '',
    Max_Canine_R: '',
    Max_M1_L: '',
    Max_M1_R: '',
    Max_M2_L: '',
    Max_M2_R: '',
    Lower_l: '',
    Lower_r: '',
    Mand_i1_L: '',
    Mand_i1_R: '',
    Mand_i2_L: '',
    Mand_i2_R: '',
    Mand_Canine_L: '',
    Mand_Canine_R: '',
    Mand_M1_L: '',
    Mand_M1_R: '',
    Mand_M2_L: '',
    Mand_M2_R: '',
    HumerusProx_l: '',
    HumerusProx_r: '',
    HumerusDia_l: '',
    HumerusDia_r: '',
    HumerusDis_l: '',
    HumerusDis_r: '',
    RadiusProx_l: '',
    RadiusProx_r: '',
    RadiusDia_l: '',
    RadiusDia_r: '',
    RadiusDis_l: '',
    RadiusDis_r: '',
    UlnaProx_l: '',
    UlnaProx_r: '',
    UlnaDia_l: '',
    UlnaDia_r: '',
    UlnaDis_l: '',
    UlnaDis_r: '',
    FemurProx_l: '',
    FemurProx_r: '',
    FemurDia_l: '',
    FemurDia_r: '',
    FemurDis_l: '',
    FemurDis_r: '',
    TibiaProx_l: '',
    TibiaProx_r: '',
    TibiaDia_l: '',
    TibiaDia_r: '',
    TibiaDis_l: '',
    TibiaDis_r: '',
    FibulaProx_l: '',
    FibulaProx_r: '',
    FibulaDia_l: '',
    FibulaDia_r: '',
    FibulaDis_l: '',
    FibulaDis_r: '',
    ClavicleProx_l: '',
    ClavicleProx_r: '',
    ClavicleDia_l: '',
    ClavicleDia_r: '',
    ClavicleEpi_l: '',
    ClavicleEpi_r: '',
    Ilium_l: '',
    ilium_r: '',
    Ischium_l: '',
    Ischium_r: '',
    Pubis_l: '',
    Pubis_r: '',
    Patella_l: '',
    Patella_r: '',
    Scapula_l: '',
    Scapula_r: '',
    Coracoid_l: '',
    Coracoid_r: '',
    Acromion_l: '',
    Acromion_r: '',
    Hyoid_lesserHorn: '',
    Hyoid_body: '',
    Hyoid_greaterHorn: '',
    Manubrium: '',
    SternabraeCount: '',
    Xiphoid: '',
    Rib_1_l: '',
    Rib_1_r: '',
    Rib_2_l: '',
    Rib_2_r: '',
    Rib_11_l: '',
    Rib_11_r: '',
    Rib_12_l: '',
    Rib_12_r: '',
    Rib_3_10_l_count: '',
    Rib_3_10_r_count: '',
    Rib_frag_Count: '',
    Atlas_l: '',
    Atlas_r: '',
    Axis_arch_l: '',
    Axis_centra: '',
    Axis_arch_r: '',
    Cervical_arch_l: '',
    Cervical_centra: '',
    Cervical_arch_r: '',
    Thoracic_arch_l: '',
    Thoracic_centra: '',
    Thoracic_arch_r: '',
    Lumbar_arch_l: '',
    Lumbar_centra: '',
    Lumbar_arch_r: '',
    Sacrum_arch_l: '',
    Sacrum_centra: '',
    Sacrum_arch_r: '',
    Coccyx_arch_l: '',
    Coccyx_centra: '',
    Coccyx_arch_r: '',
    Metacarpal1_l: '',
    Metacarpal1_r: '',
    Metacarpal2_l: '',
    Metacarpal2_r: '',
    Metacarpal3_l: '',
    Metacarpal3_r: '',
    Metacarpal4_l: '',
    Metacarpal4_r: '',
    Metacarpal5_l: '',
    Metacarpal5_r: '',
    Phalanges_Prox_Hand_Count: '',
    Phalanges_Mid_Hand_Count: '',
    Phalanges_Dist_Hand_Count: '',
    Calcaneus_l: '',
    Calcaneus_r: '',
    Talus_l: '',
    Talus_r: '',
    Cuboid_l: '',
    Cuboid_r: '',
    Metatarsals1_l: '',
    Metatarsals1_r: '',
    Metatarsals2_l: '',
    Metatarsals2_r: '',
    Metatarsals3_l: '',
    Metatarsals3_r: '',
    Metatarsals4_l: '',
    Metatarsals4_r: '',
    Metatarsals5_l: '',
    Metatarsals5_r: '',
    Phalanges_Prox_Foot_Count: '',
    Phalanges_Mid_Foot_Count: '',
    Phalanges_Dist_Foot_Count: '',
    Prosthetic_Devices: '',
    Comments: ''
  })
}
