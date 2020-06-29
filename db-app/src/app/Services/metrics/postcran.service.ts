import { Injectable } from '@angular/core';
import { PostcranMetric } from 'src/app/Exports/metrics/postcran.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PostcranService {
    private itemsUpdated = new Subject<PostcranMetric[]>();
    private items: PostcranMetric[] = [];
    private item: PostcranMetric;

    constructor(
        private http: HttpClient, 
        private router: Router,
        private globals: Globals,
    ) {}

    createItem(item: PostcranMetric): void {
        this.http.post(this.globals.URL + '/api/postcran-metric', item)
        .subscribe(res => {
            const _id = res.toString();
            item.id = _id;
            this.items.push(item);
            this.itemsUpdated.next([...this.items]);
            this.router.navigate(['/metric-postcran-table']);
        });
    }
    getItems() {
        this.http.get<{items: any}>(this.globals.URL + '/api/postcran-metric')
        .pipe(map((itemData) => {
            return itemData.items.map(item => {
                return {
                    id: item._id,
                    UTID: item.UTID,
                    FDN: item.FDN,
                    date: item.date,
                    recorder: item.recorder,
                    CML_L: item.CML_L,
                    CML_R: item.CML_R,
                    CXM_L: item.CXM_L,
                    CXM_R: item.CXM_R,
                    CWM_L: item.CWM_L,
                    CWM_R: item.CWM_R,
                    CSD_L: item.CSD_L,
                    CSD_R: item.CSD_R,
                    CVD_L: item.CVD_L,
                    CVD_R: item.CVD_R,
                    SML_L: item.SML_L,
                    SML_R: item.SML_R,
                    SMB_L: item.SMB_L,
                    SMB_R: item.SMB_R,
                    SLS_L: item.SLS_L,
                    SLS_R: item.SLS_R,
                    SSL_L: item.SSL_L,
                    SSL_R: item.SSL_R,
                    SISL_L: item.SISL_L,
                    SISL_R: item.SISL_R,
                    GCB_L: item.GCB_L,
                    GCB_R: item.GCB_R,
                    GCH_L: item.GCH_L,
                    GCH_R: item.GCH_R,
                    GIL_L: item.GIL_L,
                    GIL_R: item.GIL_R,
                    MML: item.MML,
                    MSL: item.MSL,
                    S1W: item.S1W,
                    S3W: item.S3W,
                    HML_L: item.HML_L,
                    HML_R: item.HML_R,
                    BUE_L: item.BUE_L,
                    BUE_R: item.BUE_R,
                    MDS_L: item.MDS_L,
                    MDS_R: item.MDS_R,
                    MDM_L: item.MDM_L,
                    MDM_R: item.MDM_R,
                    MDH_L: item.MDH_L,
                    MDH_R: item.MDH_R,
                    EBR_L: item.EBR_L,
                    EBR_R: item.EBR_R,
                    LCS_L: item.LCS_L,
                    LCS_R: item.LCS_R,
                    RML_L: item.RML_L,
                    RML_R: item.RML_R,
                    RDH_L: item.RDH_L,
                    RDH_R: item.RDH_R,
                    RSD_L: item.RSD_L,
                    RSD_R: item.RSD_R,
                    RTD_L: item.RTD_L,
                    RTD_R: item.RTD_R,
                    MCS_L: item.MCS_L,
                    MCS_R: item.MCS_R,
                    RXM_L: item.RXM_L,
                    RXM_R: item.RXM_R,
                    RWM_L: item.RWM_L,
                    RWM_R: item.RWM_R,
                    RXD_L: item.RXD_L,
                    RXD_R: item.RXD_R,
                    UML_L: item.UML_L,
                    UML_R: item.UML_R,
                    UPL_L: item.UPL_L,
                    UPL_R: item.UPL_R,
                    BOP_L: item.BOP_L,
                    BOP_R: item.BOP_R,
                    MBO_L: item.MBO_L,
                    MBO_R: item.MBO_R,
                    WOP_L: item.WOP_L,
                    WOP_R: item.WOP_R,
                    ORL_L: item.ORL_L,
                    ORL_R: item.ORL_R,
                    OCL_L: item.OCL_L,
                    OCL_R: item.OCL_R,
                    UAD_L: item.UAD_L,
                    UAD_R: item.UAD_R,
                    UMD_L: item.UMD_L,
                    UMD_R: item.UMD_R,
                    ULC_L: item.ULC_L,
                    UXM_L: item.UXM_L,
                    UXM_R: item.UXM_R,
                    UWM_L: item.UWM_L,
                    UWM_R: item.UWM_R,
                    ULC_R: item.ULC_R,
                    SAL: item.SAL,
                    SAB: item.SAB,
                    SMB: item.SMB,
                    SAPD: item.SAPD,
                    INH_L: item.INH_L,
                    INH_R: item.INH_R,
                    XIB_L: item.XIB_L,
                    XIB_R: item.XIB_R,
                    WIB_L: item.WIB_L,
                    WIB_R: item.WIB_R,
                    XPL_L: item.XPL_L,
                    XPL_R: item.XPL_R,
                    WPL_L: item.WPL_L,
                    WPL_R: item.WPL_R,
                    ISL_L: item.ISL_L,
                    ISL_R: item.ISL_R,
                    WISL_L: item.WISL_L,
                    WISL_R: item.WISL_R,
                    XIRL_L: item.XIRL_L,
                    XIRL_R: item.XIRL_R,
                    ASISS_L: item.ASISS_L,
                    ASISS_R: item.ASISS_R,
                    PSISS_L: item.PSISS_L,
                    PSISS_R: item.PSISS_R,
                    WAS_L: item.WAS_L,
                    WAS_R: item.WAS_R,
                    ILB_L: item.ILB_L,
                    ILB_R: item.ILB_R,
                    FML_L: item.FML_L,
                    FML_R: item.FML_R,
                    FOL_L: item.FOL_L,
                    FOL_R: item.FOL_R,
                    FTL_L: item.FTL_L,
                    FTL_R: item.FTL_R,
                    FHXD_L: item.FHXD_L,
                    FHXD_R: item.FHXD_R,
                    APD_L: item.APD_L,
                    APD_R: item.APD_R,
                    MLD_L: item.MLD_L,
                    MLD_R: item.MLD_R,
                    APS_L: item.APS_L,
                    APS_R: item.APS_R,
                    MLS_L: item.MLS_L,
                    MLS_R: item.MLS_R,
                    FXDM_L: item.FXDM_L,
                    FXDM_R: item.FXDM_R,
                    FWDM_L: item.FWDM_L,
                    FWDM_R: item.FWDM_R,
                    VHD_L: item.VHD_L,
                    VHD_R: item.VHD_R,
                    HHD_L: item.HHD_L,
                    HHD_R: item.HHD_R,
                    FEMHDD_L: item.FEMHDD_L,
                    FEMHDD_R: item.FEMHDD_R,
                    APL_L: item.APL_L,
                    APL_R: item.APL_R,
                    APM_L: item.APM_L,
                    APM_R: item.APM_R,
                    FEB_L: item.FEB_L,
                    FEB_R: item.FEB_R,
                    BCB_L: item.BCB_L,
                    BCB_R: item.BCB_R,
                    VDN_L: item.VDN_L,
                    VDN_R: item.VDN_R,
                    FCS_L: item.FCS_L,
                    FCS_R: item.FCS_R,
                    TML_L: item.TML_L,
                    TML_R: item.TML_R,
                    BPE_L: item.BPE_L,
                    BPE_R: item.BPE_R,
                    BDE_L: item.BDE_L,
                    BDE_R: item.BDE_R,
                    APN_L: item.APN_L,
                    APN_R: item.APN_R,
                    MLM_L: item.MLM_L,
                    MLM_R: item.MLM_R,
                    CFL_L: item.CFL_L,
                    CFL_R: item.CFL_R,
                    PCN_L: item.PCN_L,
                    TMC_L: item.TMC_L,
                    TMC_R: item.TMC_R,
                    PCN_R: item.PCN_R,
                    TXM_L: item.TXM_L,
                    TXM_R: item.TXM_R,
                    TWM_L: item.TWM_L,
                    TWM_R: item.TWM_R,
                    BML_L: item.BML_L,
                    BML_R: item.BML_R,
                    FMD_L: item.FMD_L,
                    FMD_R: item.FMD_R,
                    CLL_L: item.CLL_L,
                    CLL_R: item.CLL_R,
                    CMB_L: item.CMB_L,
                    CMB_R: item.CMB_R,
                    TFA_L: item.TFA_L,
                    TFA_R: item.TFA_R,
                    TFM_L: item.TFM_L,
                    TFM_R: item.TFM_R,
                    TFD_L: item.TFD_L,
                    TFD_R: item.TFD_R,
                    TOL_L: item.TOL_L,
                    TOL_R: item.TOL_R,
                };
            });
        }))
        .subscribe(items => {
            this.items = items;
            this.itemsUpdated.next([...this.items]);
        });
    }
    getItemUpdateListener(): Observable<PostcranMetric[]> {
        return this.itemsUpdated.asObservable();
    }
    getItem(id: string): PostcranMetric {
        return { ...this.items.find(item => item.id === id)};
    }
    updateItem(_id: string, item: PostcranMetric): void {
        this.http.put(this.globals.URL + '/api/postcran-metric/' + _id, item)
        .subscribe(res => {
            const updatedItems = [...this.items];
            const oldItemIndex = updatedItems.findIndex(i => i.id === item.id);
            updatedItems[oldItemIndex] = item;
            this.items = updatedItems;
            this.itemsUpdated.next([...this.items]);
            this.router.navigate(['/metric-postcran-table']);
        })
    }
    deleteItem(id: string): void {
        this.http.delete(this.globals.URL + '/api/postcran-metric/' + id)
        .subscribe(res => {
            const updatedItems = this.items.filter(item => item.id !== id);
            this.items = updatedItems;
            this.itemsUpdated.next([...this.items]);
        })
    }
    deleteItems(items: PostcranMetric[]): void {
        items.forEach(item => {
            this.deleteItem(item.id);
        })
    }
}