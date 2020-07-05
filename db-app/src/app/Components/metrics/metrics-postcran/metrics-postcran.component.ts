import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostcranService } from 'src/app/Services/metrics/postcran.service';
import { PostcranMetric } from 'src/app/Exports/metrics/postcran.model';

@Component({
  selector: 'app-metrics-postcran',
  templateUrl: './metrics-postcran.component.html',
  styleUrls: ['./metrics-postcran.component.css']
})
export class MetricsPostcranComponent implements OnInit {
  private mode = 'create';
  private itemId: string;
  item: PostcranMetric;

  constructor(
    private fb: FormBuilder, 
    private postcranService: PostcranService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('itemId')) {
        this.mode = 'edit'
        this.itemId = paramMap.get('itemId');
        this.item = this.postcranService.getItem(this.itemId);
        this.updateForm(this.item);
      } else {
        this.mode = 'create';
        this.itemId = null;
      }
    })
  }

  onSubmit() {
    if (this.mode === 'create') {
      this.postcranService.createItem(this.postcranForm.value);
    } else {
      this.postcranService.updateItem(this.itemId, this.postcranForm.value);
    }
  }

  private createForm(model: PostcranMetric): FormGroup {
    return this.fb.group(model);
  }
  private updateForm(model: Partial<PostcranMetric>): void {
    this.postcranForm.patchValue(model);
  }

  get formValue() {
    return this.postcranForm.value as PostcranMetric;
  }

  postcranForm: FormGroup = this.createForm({
    id: '',
    UTID: '',
    FDN: '',
    date: '',
    recorder: '',
    CML_L: '',
    CML_R: '',
    CXM_L: '',
    CXM_R: '',
    CWM_L: '',
    CWM_R: '',
    CSD_L: '',
    CSD_R: '',
    CVD_L: '',
    CVD_R: '',
    SML_L: '',
    SML_R: '',
    SMB_L: '',
    SMB_R: '',
    SLS_L: '',
    SLS_R: '',
    SSL_L: '',
    SSL_R: '',
    SISL_L: '',
    SISL_R: '',
    GCB_L: '',
    GCB_R: '',
    GCH_L: '',
    GCH_R: '',
    GIL_L: '',
    GIL_R: '',
    MML: '',
    MSL: '',
    S1W: '',
    S3W: '',
    HML_L: '',
    HML_R: '',
    BUE_L: '',
    BUE_R: '',
    MDS_L: '',
    MDS_R: '',
    MDM_L: '',
    MDM_R: '',
    MDH_L: '',
    MDH_R: '',
    EBR_L: '',
    EBR_R: '',
    LCS_L: '',
    LCS_R: '',
    RML_L: '',
    RML_R: '',
    RDH_L: '',
    RDH_R: '',
    RSD_L: '',
    RSD_R: '',
    RTD_L: '',
    RTD_R: '',
    MCS_L: '',
    MCS_R: '',
    RXM_L: '',
    RXM_R: '',
    RWM_L: '',
    RWM_R: '',
    RXD_L: '',
    RXD_R: '',
    UML_L: '',
    UML_R: '',
    UPL_L: '',
    UPL_R: '',
    BOP_L: '',
    BOP_R: '',
    MBO_L: '',
    MBO_R: '',
    WOP_L: '',
    WOP_R: '',
    ORL_L: '',
    ORL_R: '',
    OCL_L: '',
    OCL_R: '',
    UAD_L: '',
    UAD_R: '',
    UMD_L: '',
    UMD_R: '',
    ULC_L: '',
    UXM_L: '',
    UXM_R: '',
    UWM_L: '',
    UWM_R: '',
    ULC_R: '',
    SAL: '',
    SAB: '',
    SMB: '',
    SAPD: '',
    INH_L: '',
    INH_R: '',
    XIB_L: '',
    XIB_R: '',
    WIB_L: '',
    WIB_R: '',
    XPL_L: '',
    XPL_R: '',
    WPL_L: '',
    WPL_R: '',
    ISL_L: '',
    ISL_R: '',
    WISL_L: '',
    WISL_R: '',
    XIRL_L: '',
    XIRL_R: '',
    ASISS_L: '',
    ASISS_R: '',
    PSISS_L: '',
    PSISS_R: '',
    WAS_L: '',
    WAS_R: '',
    ILB_L: '',
    ILB_R: '',
    FML_L: '',
    FML_R: '',
    FOL_L: '',
    FOL_R: '',
    FTL_L: '',
    FTL_R: '',
    FHXD_L: '',
    FHXD_R: '',
    APD_L: '',
    APD_R: '',
    MLD_L: '',
    MLD_R: '',
    APS_L: '',
    APS_R: '',
    MLS_L: '',
    MLS_R: '',
    FXDM_L: '',
    FXDM_R: '',
    FWDM_L: '',
    FWDM_R: '',
    VHD_L: '',
    VHD_R: '',
    HHD_L: '',
    HHD_R: '',
    FEMHDD_L: '',
    FEMHDD_R: '',
    APL_L: '',
    APL_R: '',
    APM_L: '',
    APM_R: '',
    FEB_L: '',
    FEB_R: '',
    BCB_L: '',
    BCB_R: '',
    VDN_L: '',
    VDN_R: '',
    FCS_L: '',
    FCS_R: '',
    TML_L: '',
    TML_R: '',
    BPE_L: '',
    BPE_R: '',
    BDE_L: '',
    BDE_R: '',
    APN_L: '',
    APN_R: '',
    MLM_L: '',
    MLM_R: '',
    CFL_L: '',
    CFL_R: '',
    PCN_L: '',
    TMC_L: '',
    TMC_R: '',
    PCN_R: '',
    TXM_L: '',
    TXM_R: '',
    TWM_L: '',
    TWM_R: '',
    BML_L: '',
    BML_R: '',
    FMD_L: '',
    FMD_R: '',
    CLL_L: '',
    CLL_R: '',
    CMB_L: '',
    CMB_R: '',
    TFA_L: '',
    TFA_R: '',
    TFM_L: '',
    TFM_R: '',
    TFD_L: '',
    TFD_R: '',
    TOL_L: '',
    TOL_R: ''
  })
}
