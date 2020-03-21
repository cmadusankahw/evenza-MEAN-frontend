import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SignupSelectComponent } from './components/auth/signup-select/signup-select.component';
import { SignupMerchantComponent } from './components/auth/signup-merchant/signup-merchant.component';
import { CardDetailsComponent } from './components/profile/card-details/card-details.component';
import { DashboardComponent } from './components/merchantdash/dashboard/dashboard.component';
import { BprofileComponent } from './components/merchant/business-profile/bprofile/bprofile.component';


const routes: Routes = [
  {path : 'login', component : LoginComponent},
  {path : 'register', component : SignupSelectComponent},
  {path : 'register/common', component : SignupComponent},
  {path : 'register/merchant', component : SignupMerchantComponent},
  {path : 'profile/cards', component : CardDetailsComponent},
  {path : 'm/dash', component : DashboardComponent},
  {path : 'm/bprofile', component : BprofileComponent},
  {path : '', component : HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
