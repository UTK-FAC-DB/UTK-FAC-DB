import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonorTableComponent } from './donors/donor-table/donor-table.component';
import { DonorRegistrationComponent } from './donors/donor-registration/donor-registration.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: '', component: DonorTableComponent, canActivate: [AuthGuardService]},
  { path: 'donor-table', component: DonorTableComponent, canActivate: [AuthGuardService]},
  { path: 'donor-registration', component: DonorRegistrationComponent, canActivate: [AuthGuardService]},
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
