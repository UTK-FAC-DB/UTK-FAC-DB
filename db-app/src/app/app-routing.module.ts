import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonorTableComponent } from './donors/donor-table/donor-table.component';

const routes: Routes = [
  { path: '', component: DonorTableComponent },
  { path: 'donor-list', component: DonorTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DonorTableComponent];
