import { Injectable } from '@angular/core';
import { CremationInventory } from 'src/app/Exports/inventory/cremation.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CremationService {
    private itemsUpdated = new Subject<CremationInventory[]>();
    private items: CremationInventory[] = [];
    private item: CremationInventory;

    constructor(
        private http: HttpClient, 
        private router: Router,
        private globals: Globals,
    ) {}

    createItem(item: CremationInventory): void {
        this.http.post(this.globals.URL + '/api/cremation-inventory', item)
        .subscribe(res => {
            const _id = res.toString();
            item.id = _id;
            this.items.push(item);
            this.itemsUpdated.next([...this.items]);
            this.router.navigate(['/inventory-cremation-table']);
        });
    }
    getItems() {
        this.http.get<{items: any}>(this.globals.URL + '/api/cremation-inventory')
        .pipe(map((itemData) => {
            return itemData.items.map(item => {
                return {
                    id: item._id,
                    UTID: item.UTID,
                    DateReceived: item.DateReceived,
                    ContactedBy: item.ContactedBy,
                    ContactFacility: item.ContactFacility,
                    ContactDate: item.ContactDate,
                    DonatedBy: item.DonatedBy,
                    Relationship: item.Relationship,
                    TotalWeight: item.TotalWeight,
                    TotalWeightUnit: item.TotalWeightUnit,
                    LabWeight: item.LabWeight,
                    InventoryWeightUnit: item.InventoryWeightUnit,
                    CurrentLabWeight: item.CurrentLabWeight,
                    CurrentLabWeightUnit: item.CurrentLabWeightUnit,	
                    RemovedLabWeight: item.RemovedLabWeight,
                    RemovedWeightUnit: item.RemovedWeightUnit,
                    CrematedRemainsProcess: item.CrematedRemainsProcess,
                    ProstheticsRemoved: item.ProstheticsRemoved,
                    TagPlaced_By: item.TagPlaced_By,
                    TagPlaced_Date: item.TagPlaced_Date,
                    ReleasedFromDept_By: item.ReleasedFromDept_By,
                    ReleasedFromDept_Date: item.ReleasedFromDept_Date,
                    ReceivedIntoCollection_By: item.ReceivedIntoCollection_By,
                    ReceivedIntoCollection_date: item.ReceivedIntoCollection_date
                };
            });
        }))
        .subscribe(items => {
            this.items = items;
            this.itemsUpdated.next([...this.items]);
        });
    }
    getItemUpdateListener(): Observable<CremationInventory[]> {
        return this.itemsUpdated.asObservable();
    }
    getItem(id: string): CremationInventory {
        return { ...this.items.find(item => item.id === id)};
    }
    updateItem(_id: string, item: CremationInventory): void {
        this.http.put(this.globals.URL + '/api/cremation-inventory/' + _id, item)
        .subscribe(res => {
            const updatedItems = [...this.items];
            const oldItemIndex = updatedItems.findIndex(i => i.id === item.id);
            updatedItems[oldItemIndex] = item;
            this.items = updatedItems;
            this.itemsUpdated.next([...this.items]);
            this.router.navigate(['/inventory-cremation-table']);
        })
    }
    deleteItem(id: string): void {
        this.http.delete(this.globals.URL + '/api/cremation-inventory/' + id)
        .subscribe(res => {
            const updatedItems = this.items.filter(item => item.id !== id);
            this.items = updatedItems;
            this.itemsUpdated.next([...this.items]);
        })
    }
    deleteItems(items: CremationInventory[]): void {
        items.forEach(item => {
            this.deleteItem(item.id);
        })
    }
}