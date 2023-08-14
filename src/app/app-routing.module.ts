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
import { UserSignupComponent } from './userComponents/user-signup/user-signup.component';
import { ListCategoryComponent } from './userComponents/list-category/list-category.component';
import { UserProfileComponent } from './userComponents/user-profile/user-profile.component';
import { AdminAuthGuard } from './routguard/admin-guard.service'
import { WorkerDashboardComponent } from './workerComponents/worker-dashboard/worker-dashboard.component';
import { WorkerGuard } from './routguard/worker-guard.service';
import { UserGuardService } from './routguard/user-guard.service';
import { VerifiedWorkersComponent } from './adminComponents/verified-workers/verified-workers.component';
import { UserOtpComponent } from './userComponents/user-otp/user-otp.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'userLogin', component: UserLoginComponent},
  {path:'userSignup', component: UserSignupComponent},
  {path:'category', component:ListCategoryComponent},
  {path:'userProfile', component:UserProfileComponent, canActivate: [UserGuardService]},
  {path:'userOtp', component:UserOtpComponent},


  {path:'admin', component: AdminLoginComponent},
  {path:'adminHome', component: AdminDashboardComponent, canActivate: [AdminAuthGuard], children:[
    {path:'', redirectTo: 'adminChartArea', pathMatch:'full'},
    {path: 'adminChartArea', component:AdminChartAreaComponent, canActivate: [AdminAuthGuard]},
    {path: 'category', component:AdminCategoryComponent},
    {path: 'verification', component:AdminVerificationComponent},
    {path: 'verifiedWorkers', component:VerifiedWorkersComponent}
]},


  {path:'workerSignup', component: WorkerSignupComponent},
  {path:'workerLogin', component:WorkerLoginComponent},
  {path:'workerHome', component:WorkerDashboardComponent, canActivate: [WorkerGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
