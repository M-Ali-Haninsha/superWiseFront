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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './adminComponents/admin-dashboard/admin-dashboard.component';
import { WorkerDashboardComponent } from './workerComponents/worker-dashboard/worker-dashboard.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyInterceptor } from '../app/interceptor/interceptor'
import { AdminHeaderComponent } from './adminComponents/admin-header/admin-header.component';
import { AdminSideNavComponent } from './adminComponents/admin-side-nav/admin-side-nav.component';
import { AdminChartAreaComponent } from './adminComponents/admin-chart-area/admin-chart-area.component';
import { AdminCategoryComponent } from './adminComponents/admin-category/admin-category.component';
import { AdminVerificationComponent } from './adminComponents/admin-verification/admin-verification.component';
import { MatStepperModule } from '@angular/material/stepper';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatTableModule} from '@angular/material/table';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ListWorkersComponent } from './userComponents/list-workers/list-workers.component';
import { ListCategoryComponent } from './userComponents/list-category/list-category.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { UserHeaderComponent } from './userComponents/user-header/user-header.component';
import { UserFooterComponent } from './userComponents/user-footer/user-footer.component';
import { UserProfileComponent } from './userComponents/user-profile/user-profile.component';
import { AdminDialogComponent } from './adminComponents/admin-dialog/admin-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { VerifiedWorkersComponent } from './adminComponents/verified-workers/verified-workers.component';
import { UserOtpComponent } from './userComponents/user-otp/user-otp.component';
import { MatMenuModule } from '@angular/material/menu';
import { UsersComponent } from './adminComponents/users/users.component';
import { LandingPageComponent } from './workerComponents/landing-page/landing-page.component';
import { WorkerInboxComponent } from './workerComponents/worker-inbox/worker-inbox.component';
import { WorkerProfileComponent } from './workerComponents/worker-profile/worker-profile.component';
import { ViewWorkerComponent } from './userComponents/view-worker/view-worker.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { WokerDialogComponent } from './workerComponents/woker-dialog/woker-dialog.component';
import { WokerSidenavComponent } from './workerComponents/woker-sidenav/woker-sidenav.component';
import { AcceptedWorksComponent } from './workerComponents/accepted-works/accepted-works.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    UserSignupComponent,
    WorkerSignupComponent,
    UserLoginComponent,
    WorkerLoginComponent,
    HomeComponent,
    AdminDashboardComponent,
    WorkerDashboardComponent,
    AdminHeaderComponent,
    AdminSideNavComponent,
    AdminChartAreaComponent,
    AdminCategoryComponent,
    AdminVerificationComponent,
    ListWorkersComponent,
    ListCategoryComponent,
    UserHeaderComponent,
    UserFooterComponent,
    UserProfileComponent,
    AdminDialogComponent,
    VerifiedWorkersComponent,
    UserOtpComponent,
    UsersComponent,
    LandingPageComponent,
    WorkerInboxComponent,
    WorkerProfileComponent,
    ViewWorkerComponent,
    WokerDialogComponent,
    WokerSidenavComponent,
    AcceptedWorksComponent
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
    MatStepperModule,
    MatStepperModule,
    FormsModule,
    MatTableModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    MatPaginatorModule,
    MatToolbarModule,
    MatDialogModule,
    MatMenuModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCardModule
    ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
