import { Injectable } from '@angular/core';
import { FullyMetric } from 'src/app/Exports/metrics/fully.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FullyService {
    private itemsUpdated = new Subject<FullyMetric[]>();
    private items: FullyMetric[] = [];
    private item: FullyMetric;

    constructor(
        private http: HttpClient, 
        private router: Router,
        private globals: Globals,
    ) {}

    createItem(item: FullyMetric): void {
        this.http.post(this.globals.URL + '/api/fully-metric', item)
        .subscribe(res => {
            const _id = res.toString();
            item.id = _id;
            this.items.push(item);
            this.itemsUpdated.next([...this.items]);
            this.router.navigate(['/metric-fully-table']);
        });
    }
    getItems() {
        this.http.get<{items: any}>(this.globals.URL + '/api/fully-metric')
        .pipe(map((itemData) => {
            return itemData.items.map(item => {
                return {
                    id: item._id,
                    UTID: item.UTID,
                    recorder: item.recorder,
                    BBH: item.BBH,
                    C2: item.C2,
                    C3A: item.C3A,
                    C4A: item.C4A,
                    C5A: item.C5A,
                    C6A: item.C6A,
                    C7A: item.C7A,
                    T1A: item.T1A,
                    T2A: item.T2A,
                    T3A: item.T3A,
                    T4A: item.T4A,
                    T5A: item.T5A,
                    T6A: item.T6A,
                    T7A: item.T7A,
                    T8A: item.T8A,
                    T9A: item.T9A,
                    T10A: item.T10A,
                    T11A: item.T11A,
                    T12A: item.T12A,
                    L1A: item.L1A,
                    L2A: item.L2A,
                    L3A: item.L3A,
                    L4A: item.L4A,
                    L5A: item.L5A,
                    XT: item.XT,
                    S1: item.S1,
                    ANK: item.ANK,
                    ANK_L: item.ANK_L,
                    ANK_R: item.ANK_R,
                    C3P: item.C3P,
                    C4P: item.C4P,
                    C5P: item.C5P,
                    C6P: item.C6P,
                    C7P: item.C7P,
                    T1P: item.T1P,
                    T2P: item.T2P,
                    T3P: item.T3P,
                    T4P: item.T4P,
                    T5P: item.T5P,
                    T6P: item.T6P,
                    T7P: item.T7P,
                    T8P: item.T8P,
                    T9P: item.T9P,
                    T10P: item.T10P,
                    T11P: item.T11P,
                    T12P: item.T12P,
                    L1P: item.L1P,
                    L2P: item.L2P,
                    L3P: item.L3P,
                    L4P: item.L4P,
                    L5P: item.L5P,
                    XT2: item.XT2
                };
            });
        }))
        .subscribe(items => {
            this.items = items;
            this.itemsUpdated.next([...this.items]);
        });
    }
    getItemUpdateListener(): Observable<FullyMetric[]> {
        return this.itemsUpdated.asObservable();
    }
    getItem(id: string): FullyMetric {
        return { ...this.items.find(item => item.id === id)};
    }
    updateItem(_id: string, item: FullyMetric): void {
        this.http.put(this.globals.URL + '/api/fully-metric/' + _id, item)
        .subscribe(res => {
            const updatedItems = [...this.items];
            const oldItemIndex = updatedItems.findIndex(i => i.id === item.id);
            updatedItems[oldItemIndex] = item;
            this.items = updatedItems;
            this.itemsUpdated.next([...this.items]);
            this.router.navigate(['/metric-fully-table']);
        })
    }
    deleteItem(id: string): void {
        this.http.delete(this.globals.URL + '/api/fully-metric/' + id)
        .subscribe(res => {
            const updatedItems = this.items.filter(item => item.id !== id);
            this.items = updatedItems;
            this.itemsUpdated.next([...this.items]);
        })
    }
    deleteItems(items: FullyMetric[]): void {
        items.forEach(item => {
            this.deleteItem(item.id);
        })
    }
}