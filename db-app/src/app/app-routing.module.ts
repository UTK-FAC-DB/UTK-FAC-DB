import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonorTableComponent } from './donors/donor-table/donor-table.component';
import { DonorRegistrationComponent } from './donors/donor-registration/donor-registration.component';

const routes: Routes = [
  { path: '', component: DonorTableComponent },
  { path: 'donor-table', component: DonorTableComponent },
  { path: 'donor-registration', component: DonorRegistrationComponent},
  { path: 'edit/:id', component: DonorRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DonorTableComponent, DonorRegistrationComponent];
