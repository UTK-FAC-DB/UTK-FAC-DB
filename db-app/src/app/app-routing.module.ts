import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonorTableComponent } from './donors/donor-table/donor-table.component';
import { DonorRegistrationComponent } from './donors/donor-registration/donor-registration.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'donor-table', component: DonorTableComponent },
  { path: 'donor-registration', component: DonorRegistrationComponent},
  { path: 'edit/:donorId', component: DonorRegistrationComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DonorTableComponent, DonorRegistrationComponent];
