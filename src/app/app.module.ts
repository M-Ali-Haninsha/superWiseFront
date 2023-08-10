import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './adminComponents/admin-login/admin-login.component';
import { UserSignupComponent } from './userComponents/user-signup/user-signup.component';
import { UserLoginComponent } from './userComponents/user-login/user-login.component';
import { WorkerSignupComponent } from './workerComponents/worker-signup/worker-signup.component';
import { WorkerLoginComponent } from './workerComponents/worker-login/worker-login.component';
import { HomeComponent } from './userComponents/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './adminComponents/admin-dashboard/admin-dashboard.component';
import { WorkerDashboardComponent } from './workerComponents/worker-dashboard/worker-dashboard.component'
import { HttpClientModule } from '@angular/common/http';
import { AdminHeaderComponent } from './adminComponents/admin-header/admin-header.component';
import { AdminSideNavComponent } from './adminComponents/admin-side-nav/admin-side-nav.component';
import { AdminChartAreaComponent } from './adminComponents/admin-chart-area/admin-chart-area.component';
import { AdminCategoryComponent } from './adminComponents/admin-category/admin-category.component';
import { AdminVerificationComponent } from './adminComponents/admin-verification/admin-verification.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    UserSignupComponent,
    UserLoginComponent,
    WorkerSignupComponent,
    WorkerLoginComponent,
    HomeComponent,
    AdminDashboardComponent,
    WorkerDashboardComponent,
    AdminHeaderComponent,
    AdminSideNavComponent,
    AdminChartAreaComponent,
    AdminCategoryComponent,
    AdminVerificationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
