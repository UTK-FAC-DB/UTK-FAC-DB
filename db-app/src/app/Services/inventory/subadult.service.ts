import { Injectable } from '@angular/core';
import { SubadultInventory } from 'src/app/Exports/inventory/subadult.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SubadultService {
    private itemsUpdated = new Subject<SubadultInventory[]>();
    private items: SubadultInventory[] = [];
    private item: SubadultInventory;

    constructor(
        private http: HttpClient, 
        private router: Router,
        private globals: Globals,
    ) {}

    createItem(item: SubadultInventory): void {
        this.http.post(this.globals.URL + '/api/subadult-inventory', item)
        .subscribe (res => {
            const _id = res.toString();
            item.id = _id;
            this.items.push(item);
            this.itemsUpdated.next([...this.items]);
            this.router.navigate(['/inventory-subadult-table']);
        })
    }
    getItems() {
        this.http.get<{items: any}>(this.globals.URL + '/api/cremation-inventory')
        .pipe(map((itemData) => {
            return itemData.items.map(item => {
                return {
                    id:item.id,
                    UTID:item.UTID,
                    Recorder:item.Recorder,
                    DateInventoried:item.DateInventoried,
                    Condition:item.Condition,
                    Autopsy:item.Autopsy,
                    Anc:item.Anc,
                    Sex:item.Sex,
                    Age:item.Age,
                    Cranium:item.Cranium,
                    Frontal_l:item.Frontal_l,
                    Frontal_r:item.Frontal_r,
                    Parietal_l:item.Parietal_l,
                    Parietal_r:item.Parietal_r,
                    Occipital_squama:item.Occipital_squama,
                    Lateralis_L:item.Lateralis_L,
                    Lateralis_r:item.Lateralis_r,
                    Basilar:item.Basilar,
                    Temporal_squama_l:item.Temporal_squama_l,
                    Temporal_squama_r:item.Temporal_squama_r,
                    Petrous_l:item.Petrous_l,
                    Petrous_r:item.Petrous_r,
                    TympanicRing_l:item.TympanicRing_l,
                    TympanicRing_r:item.TympanicRing_r,
                    Hamulus_l:item.Hamulus_l,
                    Hamulus_r:item.Hamulus_r,
                    Stapes_l:item.Stapes_l,
                    Stapes_r:item.Stapes_r,
                    Incus_l:item.Incus_l,
                    Incus_r:item.Incus_r,
                    Malleus_l:item.Malleus_l,
                    Malleus_r:item.Malleus_r,
                    Zygomatic_l:item.Zygomatic_l,
                    Zygomatic_r:item.Zygomatic_r,
                    Palatine_l:item.Palatine_l,
                    Palatine_r:item.Palatine_r,
                    Maxilla_l:item.Maxilla_l,
                    Maxilla_r:item.Maxilla_r,
                    Nasal_l:item.Nasal_l,
                    Nasal_r:item.Nasal_r,
                    Sphenoid:item.Sphenoid,
                    pre_Sphenoid:item.pre_Sphenoid,
                    Lesserwings_l:item.Lesserwings_l,
                    Lesserwings_r:item.Lesserwings_r,
                    greaterwings_l:item.greaterwings_l,
                    greaterwings_r:item.greaterwings_r,
                    Lacrimal_l:item.Lacrimal_l,
                    Lacrimal_r:item.Lacrimal_r,
                    Ethmoid_l:item.Ethmoid_l,
                    Ethmoid_r:item.Ethmoid_r,
                    Vomer:item.Vomer,
                    NasalConchae_l:item.NasalConchae_l,
                    NasalConchae_r:item.NasalConchae_r,
                    Mandible:item.Mandible,
                    Body_l:item.Body_l,
                    Body_r:item.Body_r,
                    Ramus_l:item.Ramus_l,
                    Ramus_r:item.Ramus_r,
                    Dentition:item.Dentition,
                    Upper_l:item.Upper_l,
                    Upper_r:item.Upper_r,
                    Max_i1_L:item.Max_i1_L,
                    Max_i1_R:item.Max_i1_R,
                    Max_i2_L:item.Max_i2_L,
                    Max_i2_R:item.Max_i2_R,
                    Max_Canine_L:item.Max_Canine_L,
                    Max_Canine_R:item.Max_Canine_R,
                    Max_M1_L:item.Max_M1_L,
                    Max_M1_R:item.Max_M1_R,
                    Max_M2_L:item.Max_M2_L,
                    Max_M2_R:item.Max_M2_R,
                    Lower_l:item.Lower_l,
                    Lower_r:item.Lower_r,
                    Mand_i1_L:item.Mand_i1_L,
                    Mand_i1_R:item.Mand_i1_R,
                    Mand_i2_L:item.Mand_i2_L,
                    Mand_i2_R:item.Mand_i2_R,
                    Mand_Canine_L:item.Mand_Canine_L,
                    Mand_Canine_R:item.Mand_Canine_R,
                    Mand_M1_L:item.Mand_M1_L,
                    Mand_M1_R:item.Mand_M1_R,
                    Mand_M2_L:item.Mand_M2_L,
                    Mand_M2_R:item.Mand_M2_R,
                    HumerusProx_l:item.HumerusProx_l,
                    HumerusProx_r:item.HumerusProx_r,
                    HumerusDia_l:item.HumerusDia_l,
                    HumerusDia_r:item.HumerusDia_r,
                    HumerusDis_l:item.HumerusDis_l,
                    HumerusDis_r:item.HumerusDis_r,
                    RadiusProx_l:item.RadiusProx_l,
                    RadiusProx_r:item.RadiusProx_r,
                    RadiusDia_l:item.RadiusDia_l,
                    RadiusDia_r:item.RadiusDia_r,
                    RadiusDis_l:item.RadiusDis_l,
                    RadiusDis_r:item.RadiusDis_r,
                    UlnaProx_l:item.UlnaProx_l,
                    UlnaProx_r:item.UlnaProx_r,
                    UlnaDia_l:item.UlnaDia_l,
                    UlnaDia_r:item.UlnaDia_r,
                    UlnaDis_l:item.UlnaDis_l,
                    UlnaDis_r:item.UlnaDis_r,
                    FemurProx_l:item.FemurProx_l,
                    FemurProx_r:item.FemurProx_r,
                    FemurDia_l:item.FemurDia_l,
                    FemurDia_r:item.FemurDia_r,
                    FemurDis_l:item.FemurDis_l,
                    FemurDis_r:item.FemurDis_r,
                    TibiaProx_l:item.TibiaProx_l,
                    TibiaProx_r:item.TibiaProx_r,
                    TibiaDia_l:item.TibiaDia_l,
                    TibiaDia_r:item.TibiaDia_r,
                    TibiaDis_l:item.TibiaDis_l,
                    TibiaDis_r:item.TibiaDis_r,
                    FibulaProx_l:item.FibulaProx_l,
                    FibulaProx_r:item.FibulaProx_r,
                    FibulaDia_l:item.FibulaDia_l,
                    FibulaDia_r:item.FibulaDia_r,
                    FibulaDis_l:item.FibulaDis_l,
                    FibulaDis_r:item.FibulaDis_r,
                    ClavicleProx_l:item.ClavicleProx_l,
                    ClavicleProx_r:item.ClavicleProx_r,
                    ClavicleDia_l:item.ClavicleDia_l,
                    ClavicleDia_r:item.ClavicleDia_r,
                    ClavicleEpi_l:item.ClavicleEpi_l,
                    ClavicleEpi_r:item.ClavicleEpi_r,
                    Ilium_l:item.Ilium_l,
                    ilium_r:item.ilium_r,
                    Ischium_l:item.Ischium_l,
                    Ischium_r:item.Ischium_r,
                    Pubis_l:item.Pubis_l,
                    Pubis_r:item.Pubis_r,
                    Patella_l:item.Patella_l,
                    Patella_r:item.Patella_r,
                    Scapula_l:item.Scapula_l,
                    Scapula_r:item.Scapula_r,
                    Coracoid_l:item.Coracoid_l,
                    Coracoid_r:item.Coracoid_r,
                    Acromion_l:item.Acromion_l,
                    Acromion_r:item.Acromion_r,
                    Hyoid_lesserHorn:item.Hyoid_lesserHorn,
                    Hyoid_body:item.Hyoid_body,
                    Hyoid_greaterHorn:item.Hyoid_greaterHorn,
                    Manubrium:item.Manubrium,
                    SternabraeCount:item.SternabraeCount,
                    Xiphoid:item.Xiphoid,
                    Rib_1_l:item.Rib_1_l,
                    Rib_1_r:item.Rib_1_r,
                    Rib_2_l:item.Rib_2_l,
                    Rib_2_r:item.Rib_2_r,
                    Rib_11_l:item.Rib_11_l,
                    Rib_11_r:item.Rib_11_r,
                    Rib_12_l:item.Rib_12_l,
                    Rib_12_r:item.Rib_12_r,
                    Rib_3_10_l_count:item.Rib_3_10_l_count,
                    Rib_3_10_r_count:item.Rib_3_10_r_count,
                    Rib_frag_Count:item.Rib_frag_Count,
                    Atlas_l:item.Atlas_l,
                    Atlas_r:item.Atlas_r,
                    Axis_arch_l:item.Axis_arch_l,
                    Axis_centra:item.Axis_centra,
                    Axis_arch_r:item.Axis_arch_r,
                    Cervical_arch_l:item.Cervical_arch_l,
                    Cervical_centra:item.Cervical_centra,
                    Cervical_arch_r:item.Cervical_arch_r,
                    Thoracic_arch_l:item.Thoracic_arch_l,
                    Thoracic_centra:item.Thoracic_centra,
                    Thoracic_arch_r:item.Thoracic_arch_r,
                    Lumbar_arch_l:item.Lumbar_arch_l,
                    Lumbar_centra:item.Lumbar_centra,
                    Lumbar_arch_r:item.Lumbar_arch_r,
                    Sacrum_arch_l:item.Sacrum_arch_l,
                    Sacrum_centra:item.Sacrum_centra,
                    Sacrum_arch_r:item.Sacrum_arch_r,
                    Coccyx_arch_l:item.Coccyx_arch_l,
                    Coccyx_centra:item.Coccyx_centra,
                    Coccyx_arch_r:item.Coccyx_arch_r,
                    Metacarpal1_l:item.Metacarpal1_l,
                    Metacarpal1_r:item.Metacarpal1_r,
                    Metacarpal2_l:item.Metacarpal2_l,
                    Metacarpal2_r:item.Metacarpal2_r,
                    Metacarpal3_l:item.Metacarpal3_l,
                    Metacarpal3_r:item.Metacarpal3_r,
                    Metacarpal4_l:item.Metacarpal4_l,
                    Metacarpal4_r:item.Metacarpal4_r,
                    Metacarpal5_l:item.Metacarpal5_l,
                    Metacarpal5_r:item.Metacarpal5_r,
                    Phalanges_Prox_Hand_Count:item.Phalanges_Prox_Hand_Count,
                    Phalanges_Mid_Hand_Count:item.Phalanges_Mid_Hand_Count,
                    Phalanges_Dist_Hand_Count:item.Phalanges_Dist_Hand_Count,
                    Calcaneus_l:item.Calcaneus_l,
                    Calcaneus_r:item.Calcaneus_r,
                    Talus_l:item.Talus_l,
                    Talus_r:item.Talus_r,
                    Cuboid_l:item.Cuboid_l,
                    Cuboid_r:item.Cuboid_r,
                    Metatarsals1_l:item.Metatarsals1_l,
                    Metatarsals1_r:item.Metatarsals1_r,
                    Metatarsals2_l:item.Metatarsals2_l,
                    Metatarsals2_r:item.Metatarsals2_r,
                    Metatarsals3_l:item.Metatarsals3_l,
                    Metatarsals3_r:item.Metatarsals3_r,
                    Metatarsals4_l:item.Metatarsals4_l,
                    Metatarsals4_r:item.Metatarsals4_r,
                    Metatarsals5_l:item.Metatarsals5_l,
                    Metatarsals5_r:item.Metatarsals5_r,
                    Phalanges_Prox_Foot_Count:item.Phalanges_Prox_Foot_Count,
                    Phalanges_Mid_Foot_Count:item.Phalanges_Mid_Foot_Count,
                    Phalanges_Dist_Foot_Count:item.Phalanges_Dist_Foot_Count,
                    Prosthetic_Devices: item.Prosthetic_Devices,
                    Comments: item.comments
                };
            });
        }))
        .subscribe(items => {
            this.items = items;
            this.itemsUpdated.next([...this.items]);
        });
    }
    getItemUpdateListener(): Observable<SubadultInventory[]> {
        return this.itemsUpdated.asObservable();
    }
    getItem(id: string): SubadultInventory {
        return { ...this.items.find(item => item.id === id)};
    }
    updateItem(_id: string, item: SubadultInventory): void {
        this.http.put(this.globals.URL + '/api/subadult-inventory/' + _id, item)
        .subscribe(res => {
            const updatedItems = [...this.items];
            const oldItemIndex = updatedItems.findIndex(i => i.id === item.id);
            updatedItems[oldItemIndex] = item;
            this.items = updatedItems;
            this.itemsUpdated.next([...this.items]);
            this.router.navigate(['/inventory-subadult-table']);
        })
    }
    deleteItem(id: string): void {
        this.http.delete(this.globals.URL + '/api/subadult-inventory/' + id)
        .subscribe(res => {
            const updatedItems = this.items.filter(item => item.id !== id);
            this.items = updatedItems;
            this.itemsUpdated.next([...this.items]);
        })
    }
    deleteItems(items: SubadultInventory[]): void {
        items.forEach(item => {
            this.deleteItem(item.id);
        })
    }
}