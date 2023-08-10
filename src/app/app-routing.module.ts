import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './adminComponents/admin-login/admin-login.component';
import { HomeComponent } from './userComponents/home/home.component';
import { UserLoginComponent } from './userComponents/user-login/user-login.component';
import { AdminDashboardComponent } from './adminComponents/admin-dashboard/admin-dashboard.component';
import { WorkerLoginComponent } from './workerComponents/worker-login/worker-login.component';
import { WorkerSignupComponent } from './workerComponents/worker-signup/worker-signup.component';
import { AdminChartAreaComponent } from './adminComponents/admin-chart-area/admin-chart-area.component';
import { AdminCategoryComponent } from './adminComponents/admin-category/admin-category.component';
import { AdminVerificationComponent } from './adminComponents/admin-verification/admin-verification.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'userLogin', component: UserLoginComponent},
  {path:'admin', component: AdminLoginComponent},
  {path:'adminHome', component: AdminDashboardComponent, children:[
    {path:'', redirectTo: 'adminChartArea', pathMatch:'full'},
    {path: 'adminChartArea', component:AdminChartAreaComponent},
    {path: 'category', component:AdminCategoryComponent},
    {path: 'verification', component:AdminVerificationComponent}
]},
  {path:'workerSignup', component: WorkerSignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
