import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { DonorTableComponent } from './donors/donor-table/donor-table.component';
import { DonorRegistrationComponent } from './donors/donor-registration/donor-registration.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthGuardService } from './authentication/auth-guard.service';
import { Globals } from './globals';
import { SettingsComponent } from './settings_page/settings/settings.component';
import { UserDataFormComponent } from './settings_page/user-data-form/user-data-form.component';
import { PasswordPopUpComponent } from './settings_page/password-pop-up/password-pop-up.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HeaderComponent,
    DonorTableComponent,
    DonorRegistrationComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    UserDataFormComponent,
    PasswordPopUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    CommonModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  providers: [
    AuthenticationService, 
    AuthGuardService,
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
