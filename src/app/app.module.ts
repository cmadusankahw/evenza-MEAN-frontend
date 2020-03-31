import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { InputsModule, InputUtilitiesModule, WavesModule, ButtonsModule, ModalModule, TableModule, ChartsModule } from 'angular-bootstrap-md';
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
import { HttpClientModule } from '@angular/common/http';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FullCalendarModule } from '@fullcalendar/angular';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/home/header/header.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SignupSelectComponent } from './components/auth/signup-select/signup-select.component';
import { HomeComponent } from './components/home/home/home.component';
import { FooterComponent } from './components/home/footer/footer.component';
import { HomepageComponent } from './components/home/homepage/homepage.component';
import { SignupMerchantComponent } from './components/auth/signup-merchant/signup-merchant.component';
import { CardDetailsComponent } from './components/profile/card-details/card-details.component';
import { IdVerifyComponent } from './components/profile/id-verify/id-verify.component';
import { EventNewsComponent } from './components/event/event-news/event-news.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './components/merchantdash/dashboard/dashboard.component';
import { BookingsComponent } from './components/merchant/bookings/bookings.component';
import { DashStatComponent } from './components/merchantdash/comps/dash-stat/dash-stat.component';
import { PayStatComponent } from './components/merchantdash/comps/pay-stat/pay-stat.component';
import { SalesGraphComponent } from './components/merchantdash/graphs/sales-graph/sales-graph.component';
import { DashHomeComponent } from './components/merchantdash/pages/dash-home/dash-home.component';
import { DashBusinessProfileComponent } from './components/merchantdash/pages/dash-business-profile/dash-business-profile.component';
import { DashBookingsComponent } from './components/merchantdash/pages/dash-bookings/dash-bookings.component';
import { DashAppointmentsComponent } from './components/merchantdash/pages/dash-appointments/dash-appointments.component';
import { DashReportsComponent } from './components/merchantdash/pages/dash-reports/dash-reports.component';
import { DashProfileComponent } from './components/merchantdash/pages/dash-profile/dash-profile.component';
import { BusinessVerifyComponent } from './components/profile/business-verify/business-verify.component';
import { NoBprofileComponent } from './components/merchant/business-profile/no-bprofile/no-bprofile.component';
import { BprofileComponent } from './components/merchant/business-profile/bprofile/bprofile.component';
import { ServiceCardComponent } from './components/service/service-card/service-card.component';
import { EarningsComponent } from './components/merchant/earnings/earnings.component';
import { ServiceDetailsComponent } from './components/service/service-details/service-details.component';
import { BusinessStatComponent } from './components/merchantdash/comps/business-stat/business-stat.component';
import { BusinessOpenDaysComponent } from './components/merchant/business-profile/business-open-days/business-open-days.component';
import { AppointmentsComponent } from './components/merchant/appointments/appointments.component';
import { CalendarComponent } from './components/merchant/calendar/calendar.component';
import { DashCalendarComponent } from './components/merchantdash/pages/dash-calendar/dash-calendar.component';
import { MerchantProfileComponent } from './components/merchant/merchant-profile/merchant-profile.component';
import { ProductCardComponent } from './components/product/product-card/product-card.component';
import { ProducDetailsComponent } from './components/product/produc-details/produc-details.component';
import { PurchaseHistoryComponent } from './components/merchant/seller/purchase-history/purchase-history.component';
import { DashPurchaseHistoryComponent } from './components/merchantdash/pages/dash-purchase-history/dash-purchase-history.component';
import { InventoryComponent } from './components/merchant/seller/inventory/inventory.component';
import { DashInventoryComponent } from './components/merchantdash/pages/dash-inventory/dash-inventory.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ServiceSearchComponent } from './service-search/service-search.component';

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
    ProducDetailsComponent,
    PurchaseHistoryComponent,
    DashPurchaseHistoryComponent,
    InventoryComponent,
    DashInventoryComponent,
    ContactUsComponent,
    ProductSearchComponent,
    ServiceSearchComponent


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
    FullCalendarModule

  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
