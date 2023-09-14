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
import { UsersComponent } from './adminComponents/users/users.component';
import { ListWorkersComponent } from './userComponents/list-workers/list-workers.component';
import { WorkerInboxComponent } from './workerComponents/worker-inbox/worker-inbox.component';
import { LandingPageComponent } from './workerComponents/landing-page/landing-page.component';
import { WorkerProfileComponent } from './workerComponents/worker-profile/worker-profile.component';
import { ViewWorkerComponent } from './userComponents/view-worker/view-worker.component';
import { AcceptedWorksComponent } from './workerComponents/accepted-works/accepted-works.component';
import { UpdateWorkComponent } from './workerComponents/update-work/update-work.component';
import { WorkProgressComponent } from './userComponents/work-progress/work-progress.component';
import { SuccesspageComponent } from './userComponents/successpage/successpage.component';
import { SingleViewHistoryComponent } from './userComponents/single-view-history/single-view-history.component';

const routes: Routes = [
//recruiter routing  
  {path:'', component: HomeComponent},
  {path:'userLogin', component: UserLoginComponent},
  {path:'userSignup', component: UserSignupComponent},
  {path:'category', component:ListCategoryComponent},
  {path:'userProfile', component:UserProfileComponent, canActivate: [UserGuardService]},
  {path:'userOtp', component:UserOtpComponent},
  {path:'listWorkers/:id', component: ListWorkersComponent},
  {path:'viewWorker/:id', component: ViewWorkerComponent},
  {path:'workProgress/:id', component: WorkProgressComponent},
  {path:'successPage/:id', component: SuccesspageComponent},
  {path:'singleViewHistory/:id', component: SingleViewHistoryComponent},

//admin routing
  {path:'admin', component: AdminLoginComponent},
  {path:'adminHome', component: AdminDashboardComponent, canActivate: [AdminAuthGuard], children:[
    {path:'', redirectTo: 'adminChartArea', pathMatch:'full'},
    {path: 'adminChartArea', component:AdminChartAreaComponent, canActivate: [AdminAuthGuard]},
    {path: 'category', component:AdminCategoryComponent},
    {path: 'verification', component:AdminVerificationComponent},
    {path: 'verifiedWorkers', component:VerifiedWorkersComponent},
    {path: 'usersList', component: UsersComponent}
]},

//worker routing
  {path:'workerSignup', component: WorkerSignupComponent},
  {path:'workerLogin', component:WorkerLoginComponent},
  {path:'workerHome', component:WorkerDashboardComponent, canActivate: [WorkerGuard], children:[
    {path:'', redirectTo: 'workerLandingPage', pathMatch:'full'},
    {path:'workerLandingPage', component:LandingPageComponent},
    {path: 'inbox', component: WorkerInboxComponent},
    {path: 'workerProfile', component: WorkerProfileComponent},
    {path:'acceptedWorks', component: AcceptedWorksComponent},
    {path:'updateWorks/:id', component: UpdateWorkComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
