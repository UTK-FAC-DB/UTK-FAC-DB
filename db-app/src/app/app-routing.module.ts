import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonorTableComponent } from './donors/donor-table/donor-table.component';
import { DonorRegistrationComponent } from './donors/donor-registration/donor-registration.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { DonorCTableComponent } from './donors/donor-c-table/donor-c-table.component';
import { InventoryCremationTableComponent } from './inventory/inventory-cremation-table/inventory-cremation-table.component';
import { InventorySubadultTableComponent } from './inventory/inventory-subadult-table/inventory-subadult-table.component';
import { InventoryAdultTableComponent } from './inventory/inventory-adult-table/inventory-adult-table.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: '', component: DonorTableComponent, canActivate: [AuthGuardService]},
  { path: 'donor-table', component: DonorTableComponent, canActivate: [AuthGuardService]},
  { path: 'donor-registration', component: DonorRegistrationComponent, canActivate: [AuthGuardService]},
  { path: 'donor-c-table', component: DonorCTableComponent, canActivate: [AuthGuardService]},
  { path: 'inventory-cremation-table', component: InventoryCremationTableComponent, canActivate: [AuthGuardService]},
  { path: 'inventory-subadult-table', component: InventorySubadultTableComponent, canActivate: [AuthGuardService]},
  { path: 'inventory-adult-table', component: InventoryAdultTableComponent, canActivate: [AuthGuardService]},
  { path: 'edit/:donorId', component: DonorRegistrationComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DonorTableComponent, DonorRegistrationComponent];
