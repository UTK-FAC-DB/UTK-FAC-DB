import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonorListComponent } from './donors/donor-list/donor-list.component';


const routes: Routes = [
  { path: '', component: DonorListComponent },
  { path: 'donor-list', component: DonorListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DonorListComponent];
