import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonorTableComponent } from 'src/app/Components/donors/donor-table/donor-table.component';
import { DonorRegistrationComponent } from 'src/app/Components/donors/donor-registration/donor-registration.component';
import { LoginComponent } from 'src/app/Components/user/login/login.component';
import { RegisterComponent } from 'src/app/Components/user/register/register.component';
import { UserPageComponent } from 'src/app/Components/user/user-page/user-page.component'
import { DonorCTableComponent } from 'src/app/Components/donors/donor-c-table/donor-c-table.component';
import { DonorCRegistrationComponent } from 'src/app/Components/donors/donor-c-registration/donor-c-registration.component';
import { InventoryCremationTableComponent } from 'src/app/Components/inventory/inventory-cremation-table/inventory-cremation-table.component';
import { InventorySubadultTableComponent } from 'src/app/Components/inventory/inventory-subadult-table/inventory-subadult-table.component';
import { InventoryAdultTableComponent } from 'src/app/Components/inventory/inventory-adult-table/inventory-adult-table.component';
import { AuthGuardService } from './authentication/auth-guard.service';
import { SettingsComponent } from 'src/app/Components/settings_page/settings/settings.component';
import { AdminGuardService } from './authentication/admin-guard.service';
import { InventoryCremationComponent } from './Components/inventory/inventory-cremation/inventory-cremation.component';
import { InventoryAdultComponent } from './Components/inventory/inventory-adult/inventory-adult.component';
import { InventorySubadultComponent } from './Components/inventory/inventory-subadult/inventory-subadult.component';
import { MetricsFullyTableComponent } from './Components/metrics/metrics-fully-table/metrics-fully-table.component';
import { MetricsPostcranTableComponent } from './Components/metrics/metrics-postcran-table/metrics-postcran-table.component';

const routes: Routes = [
  { path: '', component: UserPageComponent, canActivate: [AuthGuardService]},
  { path: 'donor-table', component: DonorTableComponent, canActivate: [AuthGuardService]},
  { path: 'donor-registration', component: DonorRegistrationComponent, canActivate: [AuthGuardService]},
  { path: 'donor-c-table', component: DonorCTableComponent, canActivate: [AuthGuardService]},
  { path: 'donor-c-registration', component: DonorCRegistrationComponent, canActivate: [AuthGuardService]},
  { path: 'enter-cremation', component: InventoryCremationComponent, canActivate: [AuthGuardService]},
  { path: 'edit-cremation/:itemId', component: InventoryCremationComponent, canActivate: [AuthGuardService]},
  { path: 'inventory-cremation-table', component: InventoryCremationTableComponent, canActivate: [AuthGuardService]},
  { path: 'enter-subadult', component: InventorySubadultComponent, canActivate: [AuthGuardService]},
  { path: 'edit-subadult/:itemId', component: InventorySubadultComponent, canActivate: [AuthGuardService]},
  { path: 'inventory-subadult-table', component: InventorySubadultTableComponent, canActivate: [AuthGuardService]},
  { path: 'enter-adult', component: InventoryAdultComponent, canActivate: [AuthGuardService]},
  { path: 'edit-adult/:itemId', component: InventoryAdultComponent, canActivate: [AuthGuardService]},
  { path: 'inventory-adult-table', component: InventoryAdultTableComponent, canActivate: [AuthGuardService]},
  { path: 'edit-donor/:donorId', component: DonorRegistrationComponent, canActivate: [AuthGuardService]},
  { path: 'edit-donor-c/:donorId', component: DonorCRegistrationComponent, canActivate: [AuthGuardService]},
  { path: 'metrics-fully-table', component: MetricsFullyTableComponent, canActivate: [AuthGuardService]},
  { path: 'metrics-postcran-table', component: MetricsPostcranTableComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'setting', component: SettingsComponent, canActivate: [AdminGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DonorTableComponent, DonorRegistrationComponent];
