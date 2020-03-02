import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { DonorDetailsComponent } from './donors/donor-details/donor-details.component';
import { DonorListComponent } from './donors/donor-list/donor-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DonorDetailsComponent,
    DonorListComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
