import { Injectable } from '@angular/core';
import { AdultInventory } from 'src/app/Exports/inventory/adult.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AdultService {
    private itemsUpdated = new Subject<AdultInventory[]>();
    private items: AdultInventory[] = [];
    private item: AdultInventory;

    constructor(
        private http: HttpClient, 
        private router: Router,
        private globals: Globals,
    ) {}

    createItem(item: AdultInventory): void {
        this.http.post(this.globals.URL + '/api/adult-inventory', item)
        .subscribe (res => {
            const _id = res.toString();
            item.id = _id;
            this.items.push(item);
            this.itemsUpdated.next([...this.items]);
            this.router.navigate(['/inventory-adult-table']);
        })
    }
    getItems() {
        this.http.get<{items: any}>(this.globals.URL + '/api/adult-inventory')
        .pipe(map((itemData) => {
            return itemData.items.map(item => {
                return {
                    id: item._id,
                    UTID: item.UTID,
                    Curator: item.Curator,
                    Recorder: item.Recorder,
                    DateInventoried: item.DateInventoried,
                    Type: item.Type,
                    Condition: item.Condition,
                    Autopsy: item.Autopsy,
                    Cranium: item.Cranium,
                    Frontal: item.Frontal,
                    Parietal_L: item.Parietal_L,
                    Parietal_R: item.Parietal_R,
                    Occipital: item.Occipital,
                    Temporal_L: item.Temporal_L,
                    Temporal_R: item.Temporal_R,
                    Zygomatic_L: item.Zygomatic_L,
                    Zygomatic_R: item.Zygomatic_R,
                    Palatine_L: item.Palatine_L,
                    Palatine_R: item.Palatine_R,
                    Maxilla_L: item.Maxilla_L,
                    Maxilla_R: item.Maxilla_R,
                    Nasal_L: item.Nasal_L,
                    Nasal_R: item.Nasal_R,
                    Ethmoid: item.Ethmoid,
                    Lacrimal_L: item.Lacrimal_L,
                    Lacrimal_R: item.Lacrimal_R,
                    Vomer: item.Vomer,
                    Sphenoid: item.Sphenoid,
                    Mandible: item.Mandible,
                    Body_L: item.Body_L,
                    Body_R: item.Body_R,
                    Ramus_L: item.Ramus_L,
                    Ramus_R: item.Ramus_R,
                    Dentition: item.Dentition,
                    Upper_l: item.Upper_l,
                    Upper_r: item.Upper_r,
                    Max_i1_L: item.Max_i1_L,
                    Max_i1_R: item.Max_i1_R,
                    Max_i2_L: item.Max_i2_L,
                    Max_i2_R: item.Max_i2_R,
                    Max_Canine_L: item.Max_Canine_L,
                    Max_Canine_R: item.Max_Canine_R,
                    Max_PreM1_L: item.Max_PreM1_L,
                    Max_PreM1_R: item.Max_PreM1_R,
                    Max_PreM2_L: item.Max_PreM2_L,
                    Max_PreM2_R: item.Max_PreM2_R,
                    Max_M1_L: item.Max_M1_L,
                    Max_M1_R: item.Max_M1_R,
                    Max_M2_L: item.Max_M2_L,
                    Max_M2_R: item.Max_M2_R,
                    Max_M3_L: item.Max_M3_L,
                    Max_M3_R: item.Max_M3_R,
                    Lower_l: item.Lower_l,
                    Lower_r: item.Lower_r,
                    Mand_i1_L: item.Mand_i1_L,
                    Mand_i1_R: item.Mand_i1_R,
                    Mand_i2_L: item.Mand_i2_L,
                    Mand_i2_R: item.Mand_i2_R,
                    Mand_Canine_L: item.Mand_Canine_L,
                    Mand_Canine_R: item.Mand_Canine_R,
                    Mand_PreM1_L: item.Mand_PreM1_L,
                    Mand_PreM1_R: item.Mand_PreM1_R,
                    Mand_PreM2_L: item.Mand_PreM2_L,
                    Mand_PreM2_R: item.Mand_PreM2_R,
                    Mand_M1_L: item.Mand_M1_L,
                    Mand_M1_R: item.Mand_M1_R,
                    Mand_M2_L: item.Mand_M2_L,
                    Mand_M2_R: item.Mand_M2_R,
                    Mand_M3_L: item.Mand_M3_L,
                    Mand_M3_R: item.Mand_M3_R,
                    Postcranium: item.Postcranium,
                    Hyoid: item.Hyoid,
                    Clavicle_l: item.Clavicle_l,
                    Clavicle_r: item.Clavicle_r,
                    Scapula_l: item.Scapula_l,
                    Scapula_r: item.Scapula_r,
                    Humerus_l: item.Humerus_l,
                    Humerus_r: item.Humerus_r,
                    Radius_l: item.Radius_l,
                    Radius_r: item.Radius_r,
                    Ulna_l: item.Ulna_l,
                    Ulna_r: item.Ulna_r,
                    Manubrium: item.Manubrium,
                    SternumBody: item.SternumBody,
                    XiphoidProcess: item.XiphoidProcess,
                    Ilium_l: item.Ilium_l,
                    Ilium_r: item.Ilium_r,
                    Ischium_l: item.Ischium_l,
                    Ischium_r: item.Ischium_r,
                    Pubis_l: item.Pubis_l,
                    Pubis_r: item.Pubis_r,
                    Femur_l: item.Femur_l,
                    Femur_r: item.Femur_r,
                    Patella_l: item.Patella_l,
                    Patella_r: item.Patella_r,
                    Tibia_l: item.Tibia_l,
                    Tibia_r: item.Tibia_r,
                    Fibula_l: item.Fibula_l,
                    Fibula_r: item.Fibula_r,
                    Rib_1_l: item.Rib_1_l,
                    Rib_1_r: item.Rib_1_r,
                    Rib_2_l: item.Rib_2_l,
                    Rib_2_r: item.Rib_2_r,
                    Rib_3_10_l: item.Rib_3_10_l,
                    Rib_3_10_l_Count: item.Rib_3_10_l_Count,
                    Rib_3_10_r: item.Rib_3_10_r,
                    Rib_3_10_r_Count: item.Rib_3_10_r_Count,
                    Rib_11_l: item.Rib_11_l,
                    Rib_11_r: item.Rib_11_r,
                    Rib_12_l: item.Rib_12_l,
                    Rib_12_r: item.Rib_12_r,
                    Rib_frag_Count: item.Rib_frag_Count,
                    Atlas: item.Atlas,
                    Axis: item.Axis,
                    Cervical_3_7: item.Cervical_3_7,
                    Cervical_3_7_Count: item.Cervical_3_7_Count,
                    Thoracic_1_12: item.Thoracic_1_12,
                    Thoracic_1_12_Count: item.Thoracic_1_12_Count,
                    Lumbar_1_5: item.Lumbar_1_5,
                    Lumbar_1_5_Count: item.Lumbar_1_5_Count,
                    C3: item.C3,
                    C4: item.C4,
                    C5: item.C5,
                    C6: item.C6,
                    C7: item.C7,
                    T1: item.T1,
                    T2: item.T2,
                    T3: item.T3,
                    T4: item.T4,
                    T5: item.T5,
                    T6: item.T6,
                    T7: item.T7,
                    T8: item.T8,
                    T9: item.T9,
                    T10: item.T10,
                    T11: item.T11,
                    T12: item.T12,
                    T13: item.T13,
                    L1: item.L1,
                    L2: item.L2,
                    L3: item.L3,
                    L4: item.L4,
                    L5: item.L5,
                    L6: item.L6,
                    Sacrum: item.Sacrum,
                    Sacrum_Count: item.Sacrum_Count,
                    Coccyx: item.Coccyx,
                    Coccyx_Count: item.Coccyx_Count,
                    Hand_l: item.Hand_l,
                    Hand_r: item.Hand_r,
                    Scaphoid_l: item.Scaphoid_l,
                    Scaphoid_r: item.Scaphoid_r,
                    Lunate_l: item.Lunate_l,
                    Lunate_r: item.Lunate_r,
                    Triquetral_l: item.Triquetral_l,
                    Triquetral_r: item.Triquetral_r,
                    Pisiform_l: item.Pisiform_l,
                    Pisiform_r: item.Pisiform_r,
                    GrMultangular_l: item.GrMultangular_l,
                    GrMultangular_r: item.GrMultangular_r,
                    LessMultangular_l: item.LessMultangular_l,
                    LessMultangular_r: item.LessMultangular_r,
                    Capitate_l: item.Capitate_l,
                    Capitate_r: item.Capitate_r,
                    Hamate_l: item.Hamate_l,
                    Hamate_r: item.Hamate_r,
                    Metacarpal1_l: item.Metacarpal1_l,
                    Metacarpal2_l: item.Metacarpal2_l,
                    Metacarpal3_l: item.Metacarpal3_l,
                    Metacarpal4_l: item.Metacarpal4_l,
                    Metacarpal5_l: item.Metacarpal5_l,
                    Metacarpal1_r: item.Metacarpal1_r,
                    Metacarpal2_r: item.Metacarpal2_r,
                    Metacarpal3_r: item.Metacarpal3_r,
                    Metacarpal4_r: item.Metacarpal4_r,
                    Metacarpal5_r: item.Metacarpal5_r,
                    Phalanges_Prox_Hand_Count: item.Phalanges_Prox_Hand_Count,
                    Phalanges_Mid_Hand_Count: item.Phalanges_Mid_Hand_Count,
                    Phalanges_Dist_Hand_Count: item.Phalanges_Dist_Hand_Count,
                    Foot_l: item.Foot_l,
                    Foot_r: item.Foot_r,
                    Calcaneus_l: item.Calcaneus_l,
                    Calcaneus_r: item.Calcaneus_r,
                    Talus_l: item.Talus_l,
                    Talus_r: item.Talus_r,
                    Cuboid_l: item.Cuboid_l,
                    Cuboid_r: item.Cuboid_r,
                    Navicular_l: item.Navicular_l,
                    Navicular_r: item.Navicular_r,
                    Cuneiform1_l: item.Cuneiform1_l,
                    Cuneiform1_r: item.Cuneiform1_r,
                    Cuneiform2_l: item.Cuneiform2_l,
                    Cuneiform2_r: item.Cuneiform2_r,
                    Cuneiform3_l: item.Cuneiform3_l,
                    Cuneiform3_r: item.Cuneiform3_r,
                    Metatarsals1_l: item.Metatarsals1_l,
                    Metatarsals2_l: item.Metatarsals2_l,
                    Metatarsals3_l: item.Metatarsals3_l,
                    Metatarsals4_l: item.Metatarsals4_l,
                    Metatarsals5_l: item.Metatarsals5_l,
                    Metatarsals1_r: item.Metatarsals1_r,
                    Metatarsals2_r: item.Metatarsals2_r,
                    Metatarsals3_r: item.Metatarsals3_r,
                    Metatarsals4_r: item.Metatarsals4_r,
                    Metatarsals5_r: item.Metatarsals5_r,
                    Phalanges_Prox_Foot_Count: item.Phalanges_Prox_Foot_Count,
                    Phalanges_Mid_Foot_Count: item.Phalanges_Mid_Foot_Count,
                    Phalanges_Dist_Foot_Count: item.Phalanges_Dist_Foot_Count,
                    Sesamoids: item.Sesamoids,
                    Thyroid: item.Thyroid,
                    Cricoid: item.Cricoid,
                    Prosthetic_Devices: item.Prosthetic_Devices,
                    Comments: item.Comments
                };
            });
        }))
        .subscribe(items => {
            this.items = items;
            this.itemsUpdated.next([...this.items]);
        });
    }
    getItemUpdateListener(): Observable<AdultInventory[]> {
        return this.itemsUpdated.asObservable();
    }
    getItem(id: string): AdultInventory {
        return { ...this.items.find(item => item.id === id)};
    }
    updateItem(_id: string, item: AdultInventory): void {
        this.http.put(this.globals.URL + '/api/adult-inventory/' + _id, item)
        .subscribe(res => {
            const updatedItems = [...this.items];
            const oldItemIndex = updatedItems.findIndex(i => i.id === item.id);
            updatedItems[oldItemIndex] = item;
            this.items = updatedItems;
            this.itemsUpdated.next([...this.items]);
            this.router.navigate(['/inventory-adult-table']);
        })
    }
    deleteItem(id: string): void {
        this.http.delete(this.globals.URL + '/api/adult-inventory/' + id)
        .subscribe(res => {
            const updatedItems = this.items.filter(item => item.id !== id);
            this.items = updatedItems;
            this.itemsUpdated.next([...this.items]);
        })
    }
    deleteItems(items: AdultInventory[]): void {
        items.forEach(item => {
            this.deleteItem(item.id);
        })
    }
}