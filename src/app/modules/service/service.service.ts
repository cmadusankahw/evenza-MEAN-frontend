import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { Service, ServiceCategories, ServiceRates, ServiceQuery, Booking, Appointment } from './service.model';
import { SuccessComponent } from 'src/app/success/success.component';
import { Merchant, BusinessLocation } from '../auth/auth.model';



@Injectable({ providedIn: 'root' })
export class ServiceService  {

  private serviceUpdated = new Subject<Service>();
  private serviceProviderServiceUpdated = new Subject<Service[]>();
  private searchedServiceUpdated = new Subject<Service[]>();
  private servicesUpdated = new Subject<Service[]>();
  private categoriesUpdated = new Subject<ServiceCategories[]>();
  private bookingsUpdated = new Subject<Booking[]>();
  private locationsUpdated = new Subject<{location: BusinessLocation, business: string}[]>();

  // to add services
  private services: Service[] = [];


   // to add searched services
   private searchedServices: Service[] = [];

  // list of service provider services
  private serviceProviderServices: Service[] = [];

  // to generate quanitties list
  private categories: ServiceCategories[] = [];

  // recieved bookings
  private bookings: Booking[] = [];

  // recieved locations
  private locations: {location: BusinessLocation, business: string}[] = [];

  // to render selected service
  private service: Service;

  // to generate rates list
  private rates: ServiceRates[] = [
    {id: '1', val: '/Day'},
    {id: '2', val: '/Hr'},
    {id: '3', val: '(Fixed'},
  ];

  // api url (to be centralized)
  url = 'http://localhost:3000/api/';




  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private router: Router) { }


  // get methods

  // get current service
 getService() {
    this.serviceUpdated.next(this.service);
 }

  // get list of available services
  getServices() {
    this.http.get<{ message: string, services: Service[] }>(this.url + 'service/get')
      .subscribe((serviceList) => {
        this.services = serviceList.services;
        this.servicesUpdated.next([...this.services]);
      });
  }

  // get list of sellers only prodcts
  getServiceProviderServices() {
      this.http.get<{ message: string, services: Service[] }>(this.url + 'service/get/sp')
        .subscribe((serviceList) => {
          this.serviceProviderServices = serviceList.services;
          this.serviceProviderServiceUpdated.next([...this.serviceProviderServices]);
        });
  }

  // get categories list
  getCategories() {
    this.http.get<{ message: string, categories: ServiceCategories[] }>(this.url + 'service/cat')
    .subscribe((categoriesList) => {
     this.categories = categoriesList.categories;
     this.categoriesUpdated.next([...this.categories]);
    });
  }

   // get quantities list
   getRates() {
    return this.rates;
  }


   // get list of bookings
   getBookings() {
    this.http.get<{ message: string, bookings: Booking[] }>(this.url + 'service/booking/get')
      .subscribe((recievedBookings) => {
        this.bookings = recievedBookings.bookings;
        this.bookingsUpdated.next([...this.bookings]);
      });
    }


      // get list of locations
   getLocations() {
    this.http.get<{ message: string, locations: Merchant[] }>(this.url + 'service/location/get')
      .subscribe((res) => {
        console.log(res.locations);
        for (const book of res.locations) {
          this.locations.push({location: book.business.location, business: book.business.title});
        }
        setTimeout(() => {
          this.locationsUpdated.next([...this.locations]);
          console.log(this.locations);
        }, 1000);
      });
    }



  // listners for subjects
  getServiceUpdateListener() {
    return this.serviceUpdated.asObservable();
  }

  getBookingsUpdateListener() {
    return this.bookingsUpdated.asObservable();
  }


  getSearchedServiceUpdatedListener() {
    return this.searchedServiceUpdated.asObservable();
  }

  getServiceProviderServiceUpdateListener() {
    return this.serviceProviderServiceUpdated.asObservable();
  }


  getservicesUpdateListener() {
    return this.servicesUpdated.asObservable();
  }


  getCategoriesUpdateListener() {
    return this.categoriesUpdated.asObservable();
  }

  getLocationsUpdateListener() {
    return this.locationsUpdated.asObservable();
  }



  // crud methods

  // add new service
  addService(service: Service, images: File[]) {
    const serviceData = new FormData();
    for (const image of images) {
      if (image) {
        serviceData.append('images[]', image, image.name);
      }
    }
    console.log(serviceData);
    this.http.post<{imagePaths: string[]}>(this.url + 'service/add/img', serviceData )
      .subscribe ((recievedImages) => {
        console.log(recievedImages);
        if (recievedImages.imagePaths[0]) {
          service.image_01 = recievedImages.imagePaths[0];
        }
        if (recievedImages.imagePaths[1]) {
          service.image_02 = recievedImages.imagePaths[1];
        }
        if (recievedImages.imagePaths[2]) {
          service.image_03 = recievedImages.imagePaths[2];
        }
        this.http.post<{ message: string, result: Service }>(this.url + 'service/add', service)
        .subscribe((recievedData) => {
          console.log(recievedData.message);
          console.log(recievedData.result);
          this.getServiceProviderServices();
          this.dialog.open(SuccessComponent, {data: {message: 'Service Successfully Added!'}});
      });
    });
  }

  // update service
  updateService(service: Service, images: File[]) {
    const serviceData = new FormData();
    const currentImg = [];
    let j = 0;
    for (const image of images) {
      if (image) {
        serviceData.append('images[]', image, image.name);
        currentImg.push(j);
      }
      j++;
    }
    console.log(serviceData);
    this.http.post<{imagePaths: string[]}>(this.url + 'service/add/img', serviceData )
      .subscribe ((recievedImages) => {
      console.log(recievedImages);
      recievedImages.imagePaths.find((img) => {
        if ( currentImg.includes(2) ) {
          service.image_03 = img;
          currentImg.pop();
        } else if ( currentImg.includes(1)) {
            service.image_02 = img;
            currentImg.pop();
        } else if ( currentImg.includes(0)) {
            service.image_01 = img;
            currentImg.pop();
        }
      });
      this.http.post<{ message: string, result: Service }>(this.url + 'service/edit', service)
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        console.log(recievedData.result);
        this.service = service;
        this.serviceUpdated.next(this.service);
        this.getServiceProviderServices();
        this.dialog.open(SuccessComponent, {data: {message: 'Service Successfully Updated!'}});
    });
  });
  }

  // remove service
  removeService(serviceId: string) {
    console.log(serviceId);
    this.http.delete<{ message: string }>(this.url + 'service/edit/' + serviceId)
      .subscribe((recievedData) => {
        const updatedServices = this.serviceProviderServices.filter(prod => prod.service_id !== serviceId);
        this.serviceProviderServices = updatedServices;
        this.serviceProviderServiceUpdated.next([...this.serviceProviderServices]);
        console.log(recievedData.message);
        this.dialog.open(SuccessComponent,
          {data: {message: 'Service has Removed!'}});
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/sp/dash/bprofile']);
      });
  }

  // set current service
  setService(service: Service) {
    this.service = service;
    this.serviceUpdated.next(this.service);
    return true;
  }

  // return current services
  getUpdatedServices(){
    return this.services;
  }


  // search services
  searchServices(searchQuery: ServiceQuery) {
    this.http.post<{ message: string, services: Service[] }>(this.url + 'service/search', searchQuery)
    .subscribe((serviceList) => {
      this.searchedServices = serviceList.services;
      this.searchedServiceUpdated.next([...this.searchedServices]);
      console.log(serviceList.message);
    });
  }


  // create new booking
  createBooking(booking: Booking) {
          this.http.post<{ message: string, bookingId: string }>(this.url + 'service/booking/add', booking)
          .subscribe((recievedData) => {
            console.log(recievedData.message);
            this.router.navigate(['/print/booking/' + recievedData.bookingId]);
            this.dialog.open(SuccessComponent, {data: {message: 'Booking Successfull! Your Booking Id: ' + recievedData.bookingId}});
        });
  }

   // create new calendar booking
   createCalendarBooking(booking: Booking) {
    this.http.post<{ message: string, bookingId: string }>(this.url + 'service/calbooking/add', booking)
    .subscribe((recievedData) => {
      console.log(recievedData.message);
      this.dialog.open(SuccessComponent, {data: {message: 'Booking Successfull! Your Booking Id: ' + recievedData.bookingId}});
  });
}

  // create new appointment
   createAppointment(appointment: Appointment) {
      this.http.post<{ message: string, appointId: string }>(this.url + 'service/appoint/add', appointment)
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        this.router.navigate(['/print/appoint/' + recievedData.appointId]);
        this.dialog.open(SuccessComponent, {data: {message: 'Appointment Successfull! Your Appointment Id: ' + recievedData.appointId}});
    });
  }

  // check booking availability
  checkBookingAvailability(fromDate: string, toDate: string) {
    this.http.post<{ message: string, availability: boolean }>(this.url + 'service/booking/check', {fromDate, toDate})
    .subscribe((recievedData) => {
      console.log(recievedData.message);
    });
  }


  // check appointment availability
  checkAppointAvailability(appointedDate: string) {
    this.http.post<{ message: string, availability: boolean }>(this.url + 'service/appoint/check', {appointedDate})
    .subscribe((recievedData) => {
      console.log(recievedData.message);
    });
  }


}
