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
import { SellerDashboardComponent } from './modules/seller/seller-dash/seller-dashboard/seller-dashboard.component';
import { SellerDashHomeComponent } from './modules/seller/seller-dash/pages/seller-dash-home/seller-dash-home.component';
import { SellerDashBprofileComponent } from './modules/seller/seller-dash/pages/seller-dash-bprofile/seller-dash-bprofile.component';
import { SellerDashInventoryComponent } from './modules/seller/seller-dash/pages/seller-dash-inventory/seller-dash-inventory.component';
import { SellerDashReportsComponent } from './modules/seller/seller-dash/pages/seller-dash-reports/seller-dash-reports.component';
import { SellerDashProfileComponent } from './modules/seller/seller-dash/pages/seller-dash-profile/seller-dash-profile.component';
import { NotFoundPageComponent } from './modules/home/not-found-page/not-found-page.component';
import { SellerDashOrdersComponent } from './modules/seller/seller-dash/pages/seller-dash-orders/seller-dash-orders.component';
import { SearchProductsComponent } from './modules/product/search-products/search-products.component';
import { SearchServicesComponent } from './modules/service/search-services/search-services.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { EventplannerDashEventsComponent } from './modules/eventplanner/eventplannerdash/pages/eventplanner-dash-events/eventplanner-dash-events.component';
import { EventplannerDashBookingsComponent } from './modules/eventplanner/eventplannerdash/pages/eventplanner-dash-bookings/eventplanner-dash-bookings.component';
import { EventplannerDashAppointmentsComponent } from './modules/eventplanner/eventplannerdash/pages/eventplanner-dash-appointments/eventplanner-dash-appointments.component';
import { EventplannerDashOrdersComponent } from './modules/eventplanner/eventplannerdash/pages/eventplanner-dash-orders/eventplanner-dash-orders.component';
import { EventplannerDashProfileComponent } from './modules/eventplanner/eventplannerdash/pages/eventplanner-dash-profile/eventplanner-dash-profile.component';
import { EventplannerDashboardComponent } from './modules/eventplanner/eventplannerdash/eventplanner-dashboard/eventplanner-dashboard.component';
import { EventplannerDashHomeComponent } from './modules/eventplanner/eventplannerdash/pages/eventplanner-dash-home/eventplanner-dash-home.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupSelectComponent },
  { path: 'register/common', component: SignupComponent },
  { path: 'register/merchant', component: SignupMerchantComponent },
  { path: 'sp/bprofile', component: BprofileComponent },
  { path: 'contactus', component: ContactUsComponent },
  { path: 'services', component: SearchServicesComponent },
  { path: 'products', component: SearchProductsComponent },
  {
    path: 'sp/dash',
    component: DashboardComponent,
    children: [
      { path: '', component: DashHomeComponent },
      { path: 'bprofile', component: DashBusinessProfileComponent },
      { path: 'bookings', component: DashBookingsComponent },
      { path: 'appoints', component: DashAppointmentsComponent },
      { path: 'calendar', component: DashCalendarComponent },
      { path: 'reports', component: DashReportsComponent },
      { path: 'profile', component: DashProfileComponent },
      { path: '**', component: NotFoundPageComponent },
    ], canActivate: [AuthGuard]
  },
  {
    path: 'sel/dash',
    component: SellerDashboardComponent,
    children: [
      { path: '', component: SellerDashHomeComponent },
      { path: 'bprofile', component: SellerDashBprofileComponent },
      { path: 'orders', component: SellerDashOrdersComponent },
      { path: 'inventory', component: SellerDashInventoryComponent },
      { path: 'reports', component: SellerDashReportsComponent },
      { path: 'profile', component: SellerDashProfileComponent },
      { path: '**', component: NotFoundPageComponent },
    ], canActivate: [AuthGuard]
  },
  {
    path: 'planner',
    component: EventplannerDashboardComponent,
    children: [
      { path: '', component: EventplannerDashHomeComponent },
      { path: 'events', component: EventplannerDashEventsComponent },
      { path: 'bookings', component: EventplannerDashBookingsComponent },
      { path: 'appoints', component: EventplannerDashAppointmentsComponent },
      { path: 'orders', component: EventplannerDashOrdersComponent },
      { path: 'profile', component: EventplannerDashProfileComponent },
      { path: '**', component: NotFoundPageComponent },
    ] , canActivate: [AuthGuard]
  },
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
