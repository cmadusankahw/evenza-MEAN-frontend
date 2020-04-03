import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { SignupSelectComponent } from './modules/auth/signup-select/signup-select.component';
import { SignupMerchantComponent } from './modules/auth/signup-merchant/signup-merchant.component';
import { DashboardComponent } from './modules/serviceprovider/serviceprovider-dash/dashboard/dashboard.component';
import { BprofileComponent } from './modules/serviceprovider/business-profile/bprofile/bprofile.component';


const routes: Routes = [
  {path : 'login', component : LoginComponent},
  {path : 'register', component : SignupSelectComponent},
  {path : 'register/common', component : SignupComponent},
  {path : 'register/merchant', component : SignupMerchantComponent},
  {path : 'sp/dash', component : DashboardComponent},
  {path : 'sp/bprofile', component : BprofileComponent},
  {path : '', component : HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
