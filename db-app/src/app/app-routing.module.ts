import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonorTableComponent } from 'src/app/Components/donors/donor-table/donor-table.component';
import { DonorRegistrationComponent } from 'src/app/Components/donors/donor-registration/donor-registration.component';
import { LoginComponent } from 'src/app/Components/user/login/login.component';
import { RegisterComponent } from 'src/app/Components/user/register/register.component';
import { UserPageComponent } from 'src/app/Components/user/user-page/user-page.component'
import { DonorCTableComponent } from 'src/app/Components/donors/donor-c-table/donor-c-table.component';
import { InventoryCremationTableComponent } from 'src/app/Components/inventory/inventory-cremation-table/inventory-cremation-table.component';
import { InventorySubadultTableComponent } from 'src/app/Components/inventory/inventory-subadult-table/inventory-subadult-table.component';
import { InventoryAdultTableComponent } from 'src/app/Components/inventory/inventory-adult-table/inventory-adult-table.component';
import { AuthGuardService } from './authentication/auth-guard.service';
import { SettingsComponent } from 'src/app/Components/settings_page/settings/settings.component';
import { AdminGuardService } from './authentication/admin-guard.service';

const routes: Routes = [
  { path: '', component: UserPageComponent, canActivate: [AuthGuardService]},
  { path: 'donor-table', component: DonorTableComponent, canActivate: [AuthGuardService]},
  { path: 'donor-registration', component: DonorRegistrationComponent, canActivate: [AuthGuardService]},
  { path: 'donor-c-table', component: DonorCTableComponent, canActivate: [AuthGuardService]},
  { path: 'inventory-cremation-table', component: InventoryCremationTableComponent, canActivate: [AuthGuardService]},
  { path: 'inventory-subadult-table', component: InventorySubadultTableComponent, canActivate: [AuthGuardService]},
  { path: 'inventory-adult-table', component: InventoryAdultTableComponent, canActivate: [AuthGuardService]},
  { path: 'edit/:donorId', component: DonorRegistrationComponent, canActivate: [AuthGuardService]},
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
