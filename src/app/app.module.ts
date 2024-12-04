import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {
  InputsModule,
  InputUtilitiesModule,
  WavesModule,
  ButtonsModule,
  ModalModule,
  TableModule,
  ChartsModule,
  CarouselModule,
} from 'angular-bootstrap-md';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatDialogModule } from '@angular/material';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  NgbModule,
  NgbDropdownModule,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatSliderModule } from '@angular/material/slider';
import { DatePipe } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { QuillModule } from 'ngx-quill';
import { QRCodeModule } from 'angularx-qrcode';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { MatTabsModule } from '@angular/material/tabs';
import { getSocketUrl } from 'src/assets/url';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/auth/header/header.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { SignupSelectComponent } from './modules/auth/signup-select/signup-select.component';
import { HomeComponent } from './modules/home/home/home.component';
import { FooterComponent } from './modules/home/footer/footer.component';
import { HomepageComponent } from './modules/home/homepage/homepage.component';
import { SignupMerchantComponent } from './modules/auth/signup-merchant/signup-merchant.component';
import { CardDetailsComponent } from './modules/auth/card-details/card-details.component';
import { IdVerifyComponent } from './modules/auth/id-verify/id-verify.component';
import { EventNewsComponent } from './modules/event/event-news/event-news.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './modules/serviceprovider/serviceprovider-dash/dashboard/dashboard.component';
import { BookingsComponent } from './modules/serviceprovider/bookings/bookings.component';
import { DashStatComponent } from './modules/serviceprovider/serviceprovider-dash/comps/dash-stat/dash-stat.component';
import { PayStatComponent } from './modules/serviceprovider/serviceprovider-dash/comps/pay-stat/pay-stat.component';
import { SalesGraphComponent } from './modules/seller/seller-dash/graphs/sales-graph/sales-graph.component';
import { DashHomeComponent } from './modules/serviceprovider/serviceprovider-dash/pages/dash-home/dash-home.component';
import { DashBusinessProfileComponent } from './modules/serviceprovider/serviceprovider-dash/pages/dash-business-profile/dash-business-profile.component';
import { DashBookingsComponent } from './modules/serviceprovider/serviceprovider-dash/pages/dash-bookings/dash-bookings.component';
import { DashAppointmentsComponent } from './modules/serviceprovider/serviceprovider-dash/pages/dash-appointments/dash-appointments.component';
import { DashReportsComponent } from './modules/serviceprovider/serviceprovider-dash/pages/dash-reports/dash-reports.component';
import { DashProfileComponent } from './modules/serviceprovider/serviceprovider-dash/pages/dash-profile/dash-profile.component';
import { BusinessVerifyComponent } from './modules/auth/business-profile/business-verify/business-verify.component';
import { BprofileComponent } from './modules/auth/business-profile/bprofile/bprofile.component';
import { ServiceCardComponent } from './modules/service/service-card/service-card.component';
import { EarningsComponent } from './modules/serviceprovider/earnings/earnings.component';
import { ServiceDetailsComponent } from './modules/service/service-details/service-details.component';
import { BusinessOpenDaysComponent } from './modules/auth/business-profile/business-open-days/business-open-days.component';
import { AppointmentsComponent } from './modules/serviceprovider/appointments/appointments.component';
import { CalendarComponent } from './modules/serviceprovider/calendar/calendar.component';
import { DashCalendarComponent } from './modules/serviceprovider/serviceprovider-dash/pages/dash-calendar/dash-calendar.component';
import { MerchantProfileComponent } from './modules/auth/merchant-profile/merchant-profile.component';
import { ProductCardComponent } from './modules/product/product-card/product-card.component';
import { ContactUsComponent } from './modules/home/contact-us/contact-us.component';
import { SellerDashboardComponent } from './modules/seller/seller-dash/seller-dashboard/seller-dashboard.component';
import { SellerDashStatComponent } from './modules/seller/seller-dash/comps/seller-dash-stat/seller-dash-stat.component';
import { SellerPayStatComponent } from './modules/seller/seller-dash/comps/seller-pay-stat/seller-pay-stat.component';
import { BookingsGraphComponent } from './modules/serviceprovider/serviceprovider-dash/graphs/bookings-graph/bookings-graph.component';
import { SellerDashHomeComponent } from './modules/seller/seller-dash/pages/seller-dash-home/seller-dash-home.component';
import { SellerDashBprofileComponent } from './modules/seller/seller-dash/pages/seller-dash-bprofile/seller-dash-bprofile.component';
import { SellerDashInventoryComponent } from './modules/seller/seller-dash/pages/seller-dash-inventory/seller-dash-inventory.component';
import { SellerDashReportsComponent } from './modules/seller/seller-dash/pages/seller-dash-reports/seller-dash-reports.component';
import { SellerDashProfileComponent } from './modules/seller/seller-dash/pages/seller-dash-profile/seller-dash-profile.component';
import { SellerEarningsComponent } from './modules/seller/seller-earnings/seller-earnings.component';
import { ProductDetailsComponent } from './modules/product/product-details/product-details.component';
import { NotFoundPageComponent } from './modules/home/not-found-page/not-found-page.component';
import { SellerDashOrdersComponent } from './modules/seller/seller-dash/pages/seller-dash-orders/seller-dash-orders.component';
import { SellerOrdersComponent } from './modules/seller/seller-orders/seller-orders.component';
import { SellerInventoryComponent } from './modules/seller/seller-inventory/seller-inventory.component';
import { SellerDeliveryComponent } from './modules/seller/seller-delivery/seller-delivery.component';
import { SearchProductsComponent } from './modules/product/search-products/search-products.component';
import { SearchServicesComponent } from './modules/service/search-services/search-services.component';
import { AddNewProductComponent } from './modules/product/add-new-product/add-new-product.component';
import { AddnewServiceComponent } from './modules/service/addnew-service/addnew-service.component';
import { AuthInterceptor } from './modules/auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { EventplannerDashboardComponent } from './modules/eventplanner/eventplannerdash/eventplanner-dashboard/eventplanner-dashboard.component';
import { SuccessComponent } from './success/success.component';
import { EventCardComponent } from './modules/event/event-card/event-card.component';
import { EventplannerDashHomeComponent } from './modules/eventplanner/eventplannerdash/pages/eventplanner-dash-home/eventplanner-dash-home.component';
import { EventplannerDashEventsComponent } from './modules/eventplanner/eventplannerdash/pages/eventplanner-dash-events/eventplanner-dash-events.component';
import { EventplannerDashBookingsComponent } from './modules/eventplanner/eventplannerdash/pages/eventplanner-dash-bookings/eventplanner-dash-bookings.component';
import { EventplannerDashAppointmentsComponent } from './modules/eventplanner/eventplannerdash/pages/eventplanner-dash-appointments/eventplanner-dash-appointments.component';
import { EventplannerDashOrdersComponent } from './modules/eventplanner/eventplannerdash/pages/eventplanner-dash-orders/eventplanner-dash-orders.component';
import { EventplannerDashParticipantsComponent } from './modules/eventplanner/eventplannerdash/pages/eventplanner-dash-participants/eventplanner-dash-participants.component';
import { EventplannerDashProfileComponent } from './modules/eventplanner/eventplannerdash/pages/eventplanner-dash-profile/eventplanner-dash-profile.component';
import { EventDetailsComponent } from './modules/event/event-details/event-details.component';
import { PlannerBookingsComponent } from './modules/eventplanner/planner-bookings/planner-bookings.component';
import { PlannerAppointsComponent } from './modules/eventplanner/planner-appoints/planner-appoints.component';
import { PlannerOrdersComponent } from './modules/eventplanner/planner-orders/planner-orders.component';
import { EventPlanComponent } from './modules/event/event-plan/event-plan.component';
import { EventScheduleComponent } from './modules/event/event-schedule/event-schedule.component';
import { EventParticipantsComponent } from './modules/event/event-participants/event-participants.component';
import { PlannerProfileComponent } from './modules/eventplanner/planner-profile/planner-profile.component';
import { RatingReviewComponent } from './modules/eventplanner/rating-review/rating-review.component';
import { BookingNoteComponent } from './modules/eventplanner/booking-note/booking-note.component';
import { LocationSearchComponent } from './modules/service/location-search/location-search.component';
import { EventSelectComponent } from './modules/event/event-select/event-select.component';
import { TeramsConditionsComponent } from './modules/home/terams-conditions/terams-conditions.component';
import { AddEventComponent } from './modules/event/add-event/add-event.component';
import { CreateTaskComponent } from './modules/event/create-task/create-task.component';
import { AdminDashboardComponent } from './modules/admin/admin-dash/admin-dashboard/admin-dashboard.component';
import { AdminDashHomeComponent } from './modules/admin/admin-dash/pages/admin-dash-home/admin-dash-home.component';
import { AdminDashVerificationsComponent } from './modules/admin/admin-dash/pages/admin-dash-verifications/admin-dash-verifications.component';
import { AdminDashPaymentsComponent } from './modules/admin/admin-dash/pages/admin-dash-payments/admin-dash-payments.component';
import { AdminDashProfileComponent } from './modules/admin/admin-dash/pages/admin-dash-profile/admin-dash-profile.component';
import { AdminDashUsersComponent } from './modules/admin/admin-dash/pages/admin-dash-users/admin-dash-users.component';
import { AdminUsersComponent } from './modules/admin/admin-users/admin-users.component';
import { AdminPaymentsComponent } from './modules/admin/admin-payments/admin-payments.component';
import { AdminDashCategoriesComponent } from './modules/admin/admin-dash/pages/admin-dash-categories/admin-dash-categories.component';
import { AdminDashReportsComponent } from './modules/admin/admin-dash/pages/admin-dash-reports/admin-dash-reports.component';
import { AdminBackupComponent } from './modules/admin/admin-backup/admin-backup.component';
import { AdminPieChartComponent } from './modules/admin/admin-dash/charts/admin-pie-chart/admin-pie-chart.component';
import { AdminPaymentsChartComponent } from './modules/admin/admin-dash/charts/admin-payments-chart/admin-payments-chart.component';
import { AdminOrdersPieChartComponent } from './modules/admin/admin-dash/charts/admin-orders-pie-chart/admin-orders-pie-chart.component';
import { AdminUsersPieChartComponent } from './modules/admin/admin-dash/charts/admin-users-pie-chart/admin-users-pie-chart.component';
import { ServiceProductCategoriesComponent } from './modules/admin/service-product-categories/service-product-categories.component';
import { EventCatgoriesComponent } from './modules/admin/event-catgories/event-catgories.component';
import { AdminIdverifyComponent } from './modules/admin/admin-idverify/admin-idverify.component';
import { AdminBusinessverifyComponent } from './modules/admin/admin-businessverify/admin-businessverify.component';
import { EventNotificationComponent } from './modules/event/event-notification/event-notification.component';
import { EventServiceSearchComponent } from './modules/event/event-service-search/event-service-search.component';
import { EventProductSearchComponent } from './modules/event/event-product-search/event-product-search.component';
import { EventBudgetReportComponent } from './modules/event/event-budget-report/event-budget-report.component';
import { PlannerChatComponent } from './modules/eventplanner/planner-chat/planner-chat.component';
import { InqueryForumComponent } from './modules/eventplanner/inquery-forum/inquery-forum.component';
import { SpServiceOrdersReportComponent } from './modules/serviceprovider/reports/sp-service-orders-report/sp-service-orders-report.component';
import { SpServiceAppointmentsReportComponent } from './modules/serviceprovider/reports/sp-service-appointments-report/sp-service-appointments-report.component';
import { SpPaymentsReportComponent } from './modules/serviceprovider/reports/sp-payments-report/sp-payments-report.component';
import { SpBusinessForecastingReportComponent } from './modules/serviceprovider/reports/sp-business-forecasting-report/sp-business-forecasting-report.component';
import { SpServieDetailsReportComponent } from './modules/serviceprovider/reports/sp-servie-details-report/sp-servie-details-report.component';
import { SellerOrdersReportComponent } from './modules/seller/reports/seller-orders-report/seller-orders-report.component';
import { SellerPaymentsReportComponent } from './modules/seller/reports/seller-payments-report/seller-payments-report.component';
import { SellerProductDetailsReportComponent } from './modules/seller/reports/seller-product-details-report/seller-product-details-report.component';
import { SellerBusinessForecastComponent } from './modules/seller/reports/seller-business-forecast/seller-business-forecast.component';
import { PlannerEventDetailsReportComponent } from './modules/eventplanner/reports/planner-event-details-report/planner-event-details-report.component';
import { EventRegFormComponent } from './modules/event/event-reg-form/event-reg-form.component';


// socket io ocnfiguration
const config: SocketIoConfig = { url: getSocketUrl(), options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    SignupSelectComponent,
    HomeComponent,
    FooterComponent,
    HomepageComponent,
    SignupMerchantComponent,
    CardDetailsComponent,
    IdVerifyComponent,
    EventNewsComponent,
    DashboardComponent,
    BookingsComponent,
    DashStatComponent,
    PayStatComponent,
    SalesGraphComponent,
    DashHomeComponent,
    DashBusinessProfileComponent,
    DashBookingsComponent,
    DashAppointmentsComponent,
    DashReportsComponent,
    DashProfileComponent,
    BusinessVerifyComponent,
    BprofileComponent,
    ServiceCardComponent,
    EarningsComponent,
    ServiceDetailsComponent,
    BusinessOpenDaysComponent,
    AppointmentsComponent,
    CalendarComponent,
    DashCalendarComponent,
    MerchantProfileComponent,
    ProductCardComponent,
    ContactUsComponent,
    SellerDashboardComponent,
    SellerDashStatComponent,
    SellerPayStatComponent,
    BookingsGraphComponent,
    SellerDashHomeComponent,
    SellerDashBprofileComponent,
    SellerDashInventoryComponent,
    SellerDashReportsComponent,
    SellerDashProfileComponent,
    SellerEarningsComponent,
    ProductDetailsComponent,
    NotFoundPageComponent,
    SellerDashOrdersComponent,
    SellerOrdersComponent,
    SellerInventoryComponent,
    SellerDeliveryComponent,
    SearchProductsComponent,
    SearchServicesComponent,
    AddNewProductComponent,
    AddnewServiceComponent,
    ErrorComponent,
    EventplannerDashboardComponent,
    SuccessComponent,
    EventCardComponent,
    EventplannerDashHomeComponent,
    EventplannerDashEventsComponent,
    EventplannerDashBookingsComponent,
    EventplannerDashAppointmentsComponent,
    EventplannerDashOrdersComponent,
    EventplannerDashParticipantsComponent,
    EventplannerDashProfileComponent,
    EventDetailsComponent,
    PlannerBookingsComponent,
    PlannerAppointsComponent,
    PlannerOrdersComponent,
    EventPlanComponent,
    EventScheduleComponent,
    EventParticipantsComponent,
    PlannerProfileComponent,
    RatingReviewComponent,
    BookingNoteComponent,
    LocationSearchComponent,
    EventSelectComponent,
    TeramsConditionsComponent,
    AddEventComponent,
    CreateTaskComponent,
    AdminDashboardComponent,
    AdminDashHomeComponent,
    AdminDashVerificationsComponent,
    AdminDashPaymentsComponent,
    AdminDashProfileComponent,
    AdminDashUsersComponent,
    AdminUsersComponent,
    AdminPaymentsComponent,
    AdminDashCategoriesComponent,
    AdminDashReportsComponent,
    AdminBackupComponent,
    AdminPieChartComponent,
    AdminPaymentsChartComponent,
    AdminOrdersPieChartComponent,
    AdminUsersPieChartComponent,
    ServiceProductCategoriesComponent,
    EventCatgoriesComponent,
    AdminIdverifyComponent,
    AdminBusinessverifyComponent,
    EventNotificationComponent,
    EventServiceSearchComponent,
    EventProductSearchComponent,
    EventBudgetReportComponent,
    PlannerChatComponent,
    InqueryForumComponent,
    SpServiceOrdersReportComponent,
    SpServiceAppointmentsReportComponent,
    SpPaymentsReportComponent,
    SpBusinessForecastingReportComponent,
    SpServieDetailsReportComponent,
    SellerOrdersReportComponent,
    SellerPaymentsReportComponent,
    SellerProductDetailsReportComponent,
    SellerBusinessForecastComponent,
    PlannerEventDetailsReportComponent,
    EventRegFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    InputsModule,
    InputUtilitiesModule,
    WavesModule,
    ButtonsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CreditCardDirectivesModule,
    ModalModule,
    MatSidenavModule,
    LayoutModule,
    MatToolbarModule,
    MatListModule,
    TableModule,
    MatTableModule,
    MatPaginatorModule,
    ChartsModule,
    MatProgressBarModule,
    NgbModule,
    MatCheckboxModule,
    FullCalendarModule,
    CarouselModule,
    MatSliderModule,
    MatDialogModule,
    NgbDropdownModule,
    DragDropModule,
    NgbProgressbarModule,
    QRCodeModule,
    MatTabsModule,
    SocketIoModule.forRoot(config),
    QuillModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB4MIX31RUspo9HAkq90KM3W3Ltyw4UIx0',
      libraries: ['places'],
    }),
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent, SuccessComponent],
})
export class AppModule {}
