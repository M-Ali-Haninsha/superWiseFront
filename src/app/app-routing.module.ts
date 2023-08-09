import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './adminComponents/admin-login/admin-login.component';
import { HomeComponent } from './userComponents/home/home.component';
import { UserLoginComponent } from './userComponents/user-login/user-login.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'userLogin', component: UserLoginComponent},
  {path:'admin', component: AdminLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
