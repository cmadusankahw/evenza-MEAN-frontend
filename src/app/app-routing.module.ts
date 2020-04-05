import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { SignupSelectComponent } from './modules/auth/signup-select/signup-select.component';
import { SignupMerchantComponent } from './modules/auth/signup-merchant/signup-merchant.component';
import { DashboardComponent } from './modules/serviceprovider/serviceprovider-dash/dashboard/dashboard.component';
import { BprofileComponent } from './modules/serviceprovider/business-profile/bprofile/bprofile.component';
import { DashAppointmentsComponent } from './modules/serviceprovider/serviceprovider-dash/pages/dash-appointments/dash-appointments.component';
import { DashBusinessProfileComponent } from './modules/serviceprovider/serviceprovider-dash/pages/dash-business-profile/dash-business-profile.component';
import { DashBookingsComponent } from './modules/serviceprovider/serviceprovider-dash/pages/dash-bookings/dash-bookings.component';
import { DashCalendarComponent } from './modules/serviceprovider/serviceprovider-dash/pages/dash-calendar/dash-calendar.component';
import { DashReportsComponent } from './modules/serviceprovider/serviceprovider-dash/pages/dash-reports/dash-reports.component';
import { DashProfileComponent } from './modules/serviceprovider/serviceprovider-dash/pages/dash-profile/dash-profile.component';
import { DashHomeComponent } from './modules/serviceprovider/serviceprovider-dash/pages/dash-home/dash-home.component';
import { ContactUsComponent } from './modules/home/contact-us/contact-us.component';


const routes: Routes = [
  {path : 'login', component : LoginComponent},
  {path : 'register', component : SignupSelectComponent},
  {path : 'register/common', component : SignupComponent},
  {path : 'register/merchant', component : SignupMerchantComponent},
  {path : 'sp/dash',
   component : DashboardComponent ,
   children : [
      {path : '' , component : DashHomeComponent},
      {path : 'bprofile' , component : DashBusinessProfileComponent},
      {path : 'bookings' , component : DashBookingsComponent},
      {path : 'appoints' , component : DashAppointmentsComponent},
      {path : 'calendar' , component : DashCalendarComponent},
      {path : 'reports' , component : DashReportsComponent},
      {path : 'profile' , component : DashProfileComponent},
    ]},
  {path : 'sp/bprofile', component : BprofileComponent},
  {path : 'contactus', component : ContactUsComponent},
  {path : '', component : HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
