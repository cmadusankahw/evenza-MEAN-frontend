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
import { EventAgendaComponent } from './modules/event/docs/event-agenda/event-agenda.component';
import { ParticipantListComponent } from './modules/event/docs/participant-list/participant-list.component';
import { EventInvitationComponent } from './modules/event/docs/event-invitation/event-invitation.component';
import { AddEventComponent } from './modules/event/add-event/add-event.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupSelectComponent },
  { path: 'register/common', component: SignupComponent },
  { path: 'register/merchant', component: SignupMerchantComponent },
  { path: 'sp/bprofile', component: BprofileComponent },
  { path: 'contactus', component: ContactUsComponent },
  { path: 'services', component: SearchServicesComponent },
  { path: 'products', component: SearchProductsComponent },
  { path: 'print/booking/:id', component: BookingNoteComponent },
  { path: 'print/appoint/:id', component: BookingNoteComponent },
  { path: 'print/order/:id', component: BookingNoteComponent },
  { path: 'print/agenda/:id', component: EventAgendaComponent },
  { path: 'print/plist/:id', component: ParticipantListComponent },
  { path: 'print/invitation/:id', component: EventInvitationComponent },
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
      { path: 'event/details/:id', component: EventDetailsComponent },
      { path: 'event/plan/:id', component: EventPlanComponent },
      { path: 'event/schedule/:id', component: EventScheduleComponent },
      { path: 'event/participants/:id', component: EventParticipantsComponent },
      { path: 'event/select', component: EventSelectComponent },
      { path: 'event/add/:id', component: AddEventComponent },
      { path: 'event/edit/:id', component: AddEventComponent },
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
