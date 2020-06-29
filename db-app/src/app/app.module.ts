import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from './Exports/modules/mat/mat.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from 'src/app/Components/toolbar/toolbar.component';
import { DonorTableComponent } from 'src/app/Components/donors/donor-table/donor-table.component';
import { DonorRegistrationComponent } from 'src/app/Components/donors/donor-registration/donor-registration.component';
import { LoginComponent } from 'src/app/Components/user/login/login.component';
import { RegisterComponent } from 'src/app/Components/user/register/register.component';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { AuthGuardService } from 'src/app/authentication/auth-guard.service';
import { Globals } from 'src/app/globals';
import { SettingsComponent } from 'src/app/Components/settings_page/settings/settings.component';
import { UserDataFormComponent } from 'src/app/Components/settings_page/user-data-form/user-data-form.component';
import { PopUpComponent } from 'src/app/Components/settings_page/pop-up/pop-up.component';
import { UserPageComponent } from 'src/app/Components/user/user-page/user-page.component';
import { AdminGuardService } from 'src/app/authentication/admin-guard.service';
import { DonorCTableComponent } from 'src/app/Components/donors/donor-c-table/donor-c-table.component';
import { InventoryCremationTableComponent } from 'src/app/Components/inventory/inventory-cremation-table/inventory-cremation-table.component';
import { InventoryAdultTableComponent } from 'src/app/Components/inventory/inventory-adult-table/inventory-adult-table.component';
import { InventorySubadultTableComponent } from 'src/app/Components/inventory/inventory-subadult-table/inventory-subadult-table.component';
import { SidenavComponent } from './Components/sidenav/sidenav.component';
import { DonorCRegistrationComponent } from './Components/donors/donor-c-registration/donor-c-registration.component';
import { InventoryCremationComponent } from './Components/inventory/inventory-cremation/inventory-cremation.component';
import { InventoryAdultComponent } from './Components/inventory/inventory-adult/inventory-adult.component';
import { InventorySubadultComponent } from './Components/inventory/inventory-subadult/inventory-subadult.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MetricsFullyTableComponent } from './Components/metrics/metrics-fully-table/metrics-fully-table.component';
import { MetricsPostcranTableComponent } from './Components/metrics/metrics-postcran-table/metrics-postcran-table.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ToolbarComponent,
    DonorTableComponent,
    DonorRegistrationComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    UserDataFormComponent,
    PopUpComponent,
    UserPageComponent,
    DonorCTableComponent,
    InventoryCremationTableComponent,
    InventoryAdultTableComponent,
    InventorySubadultTableComponent,
    SidenavComponent,
    DonorCRegistrationComponent,
    InventoryCremationComponent,
    InventoryAdultComponent,
    InventorySubadultComponent,
    MetricsFullyTableComponent,
    MetricsPostcranTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    MatModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    AuthenticationService, 
    AuthGuardService,
    AdminGuardService,
    Globals,
    Headers,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
