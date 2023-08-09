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
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms'


@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    UserSignupComponent,
    UserLoginComponent,
    WorkerSignupComponent,
    WorkerLoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
