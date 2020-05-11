import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { InputsModule,
        InputUtilitiesModule,
        WavesModule,
        ButtonsModule,
        ModalModule,
        TableModule,
        ChartsModule,
        CarouselModule } from 'angular-bootstrap-md';
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
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FullCalendarModule } from '@fullcalendar/angular';
import {MatSliderModule} from '@angular/material/slider';
import { DatePipe } from '@angular/common';


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
import { IdVerifyComponent } from './modules/serviceprovider/id-verify/id-verify.component';
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
import { BusinessVerifyComponent } from './modules/serviceprovider/business-profile/business-verify/business-verify.component';
import { NoBprofileComponent } from './modules/serviceprovider/business-profile/no-bprofile/no-bprofile.component';
import { BprofileComponent } from './modules/serviceprovider/business-profile/bprofile/bprofile.component';
import { ServiceCardComponent } from './modules/service/service-card/service-card.component';
import { EarningsComponent } from './modules/serviceprovider/earnings/earnings.component';
import { ServiceDetailsComponent } from './modules/service/service-details/service-details.component';
import { BusinessStatComponent } from './modules/serviceprovider/serviceprovider-dash/comps/business-stat/business-stat.component';
import { BusinessOpenDaysComponent } from './modules/serviceprovider/business-profile/business-open-days/business-open-days.component';
import { AppointmentsComponent } from './modules/serviceprovider/appointments/appointments.component';
import { CalendarComponent } from './modules/serviceprovider/calendar/calendar.component';
import { DashCalendarComponent } from './modules/serviceprovider/serviceprovider-dash/pages/dash-calendar/dash-calendar.component';
import { MerchantProfileComponent } from './modules/serviceprovider/serviceprovider-profile/merchant-profile.component';
import { ProductCardComponent } from './modules/product/product-card/product-card.component';
import { ContactUsComponent } from './modules/home/contact-us/contact-us.component';
import { SellerDashboardComponent } from './modules/seller/seller-dash/seller-dashboard/seller-dashboard.component';
import { SellerBusinessStatComponent } from './modules/seller/seller-dash/comps/seller-business-stat/seller-business-stat.component';
import { SellerDashStatComponent } from './modules/seller/seller-dash/comps/seller-dash-stat/seller-dash-stat.component';
import { SellerPayStatComponent } from './modules/seller/seller-dash/comps/seller-pay-stat/seller-pay-stat.component';
import { BookingsGraphComponent } from './modules/serviceprovider/serviceprovider-dash/graphs/bookings-graph/bookings-graph.component';
import { SellerDashHomeComponent } from './modules/seller/seller-dash/pages/seller-dash-home/seller-dash-home.component';
import { SellerDashBprofileComponent } from './modules/seller/seller-dash/pages/seller-dash-bprofile/seller-dash-bprofile.component';
import { SellerDashInventoryComponent } from './modules/seller/seller-dash/pages/seller-dash-inventory/seller-dash-inventory.component';
import { SellerDashReportsComponent } from './modules/seller/seller-dash/pages/seller-dash-reports/seller-dash-reports.component';
import { SellerDashProfileComponent } from './modules/seller/seller-dash/pages/seller-dash-profile/seller-dash-profile.component';
import { SellerBprofileComponent } from './modules/seller/business-profile/seller-bprofile/seller-bprofile.component';
import { SellerNoBprofileComponent } from './modules/seller/business-profile/seller-no-bprofile/seller-no-bprofile.component';
import { SellerBusinessVerifyComponent } from './modules/seller/business-profile/seller-business-verify/seller-business-verify.component';
import { SellerProfileComponent } from './modules/seller/seller-profile/seller-profile.component';
import { SellerIdVerifyComponent } from './modules/seller/seller-id-verify/seller-id-verify.component';
import { SellerEarningsComponent } from './modules/seller/seller-earnings/seller-earnings.component';
import { SellerBusinessOpenDaysComponent } from './modules/seller/business-profile/seller-business-open-days/seller-business-open-days.component';
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
    NoBprofileComponent,
    BprofileComponent,
    ServiceCardComponent,
    EarningsComponent,
    ServiceDetailsComponent,
    BusinessStatComponent,
    BusinessOpenDaysComponent,
    AppointmentsComponent,
    CalendarComponent,
    DashCalendarComponent,
    MerchantProfileComponent,
    ProductCardComponent,
    ContactUsComponent,
    SellerDashboardComponent,
    SellerBusinessStatComponent,
    SellerDashStatComponent,
    SellerPayStatComponent,
    BookingsGraphComponent,
    SellerDashHomeComponent,
    SellerDashBprofileComponent,
    SellerDashInventoryComponent,
    SellerDashReportsComponent,
    SellerDashProfileComponent,
    SellerBprofileComponent,
    SellerNoBprofileComponent,
    SellerBusinessVerifyComponent,
    SellerProfileComponent,
    SellerIdVerifyComponent,
    SellerEarningsComponent,
    SellerBusinessOpenDaysComponent,
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
    MatDialogModule

  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent, SuccessComponent]
})
export class AppModule { }
