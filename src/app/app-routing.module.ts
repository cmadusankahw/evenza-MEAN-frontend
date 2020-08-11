import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home/home.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { SignupSelectComponent } from './modules/auth/signup-select/signup-select.component';
import { SignupMerchantComponent } from './modules/auth/signup-merchant/signup-merchant.component';
import { DashboardComponent } from './modules/serviceprovider/serviceprovider-dash/dashboard/dashboard.component';
import { BprofileComponent } from './modules/auth/business-profile/bprofile/bprofile.component';
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
import { BookingNoteComponent } from './modules/eventplanner/booking-note/booking-note.component';
import { EventDetailsComponent } from './modules/event/event-details/event-details.component';
import { EventPlanComponent } from './modules/event/event-plan/event-plan.component';
import { EventScheduleComponent } from './modules/event/event-schedule/event-schedule.component';
import { EventParticipantsComponent } from './modules/event/event-participants/event-participants.component';
import { EventSelectComponent } from './modules/event/event-select/event-select.component';
import { AddEventComponent } from './modules/event/add-event/add-event.component';
import { ServiceDetailsComponent } from './modules/service/service-details/service-details.component';
import { ProductDetailsComponent } from './modules/product/product-details/product-details.component';
import { AdminDashHomeComponent } from './modules/admin/admin-dash/pages/admin-dash-home/admin-dash-home.component';
import { AdminDashboardComponent } from './modules/admin/admin-dash/admin-dashboard/admin-dashboard.component';
import { AdminDashVerificationsComponent } from './modules/admin/admin-dash/pages/admin-dash-verifications/admin-dash-verifications.component';
import { AdminDashPaymentsComponent } from './modules/admin/admin-dash/pages/admin-dash-payments/admin-dash-payments.component';
import { AdminDashUsersComponent } from './modules/admin/admin-dash/pages/admin-dash-users/admin-dash-users.component';
import { AdminDashProfileComponent } from './modules/admin/admin-dash/pages/admin-dash-profile/admin-dash-profile.component';
import { AdminDashCategoriesComponent } from './modules/admin/admin-dash/pages/admin-dash-categories/admin-dash-categories.component';
import { AdminDashReportsComponent } from './modules/admin/admin-dash/pages/admin-dash-reports/admin-dash-reports.component';
import { TeramsConditionsComponent } from './modules/home/terams-conditions/terams-conditions.component';
import { EventServiceSearchComponent } from './modules/event/event-service-search/event-service-search.component';
import { EventProductSearchComponent } from './modules/event/event-product-search/event-product-search.component';
import { EventBudgetReportComponent } from './modules/event/event-budget-report/event-budget-report.component';
import { PlannerChatComponent } from './modules/eventplanner/planner-chat/planner-chat.component';
import { PlannerEventDetailsReportComponent } from './modules/eventplanner/reports/planner-event-details-report/planner-event-details-report.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupSelectComponent },
  { path: 'register/common', component: SignupComponent },
  { path: 'register/merchant', component: SignupMerchantComponent },
  { path: 'bprofile/:id', component: BprofileComponent },
  { path: 'events/:id', component: EventDetailsComponent },
  { path: 'contactus', component: ContactUsComponent },
  { path: 'services', component: SearchServicesComponent },
  { path: 'products', component: SearchProductsComponent },
  { path: 'terms', component: TeramsConditionsComponent },
  { path: 'inquery', component: PlannerChatComponent },
  { path: 'print/booking/:id', component: BookingNoteComponent },
  { path: 'print/appoint/:id', component: BookingNoteComponent },
  { path: 'print/order/:id', component: BookingNoteComponent },
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
    ],
    canActivate: [AuthGuard],
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
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'planner',
    component: EventplannerDashboardComponent,
    children: [
      { path: '', component: EventplannerDashHomeComponent },
      { path: 'event/details/:id', component: EventDetailsComponent },
      { path: 'event/plan/:id', component: EventPlanComponent },
      {
        path: 'event/reports/budget/:id',
        component: EventBudgetReportComponent,
      },
      { path: 'event/schedule/:id', component: EventScheduleComponent },
      { path: 'event/participants/:id', component: EventParticipantsComponent },
      { path: 'event/select', component: EventSelectComponent },
      { path: 'event/add/:id', component: AddEventComponent },
      { path: 'event/edit/:id', component: AddEventComponent },
      { path: 'services', component: EventServiceSearchComponent },
      { path: 'products', component: EventProductSearchComponent },
      { path: 'service/:id', component: ServiceDetailsComponent }, // needd configuration
      { path: 'product/:id', component: ProductDetailsComponent }, // needd configuration
      { path: 'events', component: EventplannerDashEventsComponent },
      { path: 'bookings', component: EventplannerDashBookingsComponent },
      { path: 'appoints', component: EventplannerDashAppointmentsComponent },
      { path: 'orders', component: EventplannerDashOrdersComponent },
      { path: 'reports', component: PlannerEventDetailsReportComponent },
      { path: 'profile', component: EventplannerDashProfileComponent },
      { path: '**', component: NotFoundPageComponent },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: '', component: AdminDashHomeComponent },
      { path: 'verify', component: AdminDashVerificationsComponent },
      { path: 'payments', component: AdminDashPaymentsComponent },
      { path: 'users', component: AdminDashUsersComponent },
      { path: 'categories', component: AdminDashCategoriesComponent },
      { path: 'reports', component: AdminDashReportsComponent },
      { path: 'profile', component: AdminDashProfileComponent },
      { path: '**', component: NotFoundPageComponent },
    ],
    canActivate: [AuthGuard],
  },
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
