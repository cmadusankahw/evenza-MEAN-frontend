import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  MatDialog,
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';

import {
  Service,
  ServiceCategories,
  ServiceRates,
  ServiceQuery,
  Booking,
  Appointment,
  EventServiceQuery,
  Promotion,
} from './service.model';
import { SuccessComponent } from 'src/app/success/success.component';
import { ErrorComponent } from 'src/app/error/error.component';
import { getSocketUrl, getUrl } from 'src/assets/url';

@Injectable({ providedIn: 'root' })
export class ServiceService {
  // subjects : observer pattern
  private serviceUpdated = new Subject<Service>();
  private serviceProviderServiceUpdated = new Subject<Service[]>();
  private searchedServiceUpdated = new Subject<Service[]>();
  private searchedEventServiceUpdated = new Subject<Service[]>();
  private servicesUpdated = new Subject<Service[]>();
  private categoriesUpdated = new Subject<ServiceCategories[]>();
  private bookingsUpdated = new Subject<Booking[]>();
  private locationsUpdated = new Subject<any[]>();
  private serviceNamesUpdated = new Subject<any[]>();


  // to add services
  private services: Service[] = [];
  // to add searched services
  private searchedServices: Service[] = [];
  // event realte searched services
  private searchedEventServices: Service[] = [];
  // list of service provider services
  private serviceProviderServices: Service[] = [];
  // to generate quanitties list
  private categories: ServiceCategories[] = [];
  // recieved bookings
  private bookings: Booking[] = [];
  // recieved locations
  private locations: any[] = [];
  // to render selected service
  private service: Service;
  // to generate rates list
  private rates: ServiceRates[] = [
    { id: '1', val: '/Day' },
    { id: '2', val: '/Hr' },
    { id: '3', val: '(Fixed' },
  ];
  // socket connection
  private socket = io(getSocketUrl());
  // api url
  private url = getUrl();

  // snack bars for notification display
  private horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  // get methods

  // get selected service
  public getService() {
    this.serviceUpdated.next(this.service);
  }

  // set current service
  public setService(service: Service) {
    this.service = service;
    this.serviceUpdated.next(this.service);
    return true;
  }

  // return current services
  public getUpdatedServices() {
    return this.services;
  }

  // get list of available services
  public getServices() {
    this.http
      .get<{ message: string; services: Service[] }>(this.url + 'service/get')
      .subscribe((serviceList) => {
        this.services = serviceList.services;
        this.servicesUpdated.next([...this.services]);
      });
  }

  // get list of sellers only prodcts
  public getServiceProviderServices() {
    this.http
      .get<{ message: string; services: Service[] }>(
        this.url + 'service/get/sp'
      )
      .subscribe((serviceList) => {
        this.serviceProviderServices = serviceList.services;
        this.serviceProviderServiceUpdated.next([
          ...this.serviceProviderServices,
        ]);
      });
  }

  // get categories list
  public getCategories() {
    this.http
      .get<{ message: string; categories: ServiceCategories[] }>(
        this.url + 'service/cat/get'
      )
      .subscribe((categoriesList) => {
        this.categories = categoriesList.categories;
        this.categoriesUpdated.next([...this.categories]);
      });
  }

 // get categories list
  public getServiceNames() {
    this.http
      .get<{ serviceNames: {service_name: string, service_id: string}[] }>(
        this.url + 'service/snames'
      )
      .subscribe((recieved) => {
        this.serviceNamesUpdated.next(recieved.serviceNames);
      });
  }

  // get service rates list
  public getRates() {
    return this.rates;
  }

  // get list of bookings
  public getBookings() {
    this.http
      .get<{ message: string; bookings: Booking[] }>(
        this.url + 'service/booking/get'
      )
      .subscribe((recievedBookings) => {
        this.bookings = recievedBookings.bookings;
        this.bookingsUpdated.next([...this.bookings]);
      });
  }

  // get list of locations !!!!!!!! edit
  public getLocations() {
    this.http
      .get<{ message: string; locations: any[] }>(
        this.url + 'service/location/get'
      )
      .subscribe((res) => {
        console.log(res.locations);
        this.locations = res.locations;
        this.locationsUpdated.next([...this.locations]);
      });
  }


  // setters

  // add new service
  public addService(service: Service, images: File[]) {
    const serviceData = new FormData();
    for (const image of images) {
      if (image) {
        serviceData.append('images[]', image, image.name);
      }
    }
    console.log(serviceData);
    this.http
      .post<{ imagePaths: string[] }>(this.url + 'service/img/add', serviceData)
      .subscribe((recievedImages) => {
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
        this.http
          .post<{ message: string; result: Service }>(
            this.url + 'service/add',
            service
          )
          .subscribe((recievedData) => {
            console.log(recievedData.message);
            console.log(recievedData.result);
            this.getServiceProviderServices();
            this.dialog.open(SuccessComponent, {
              data: { message: 'Service Successfully Added!' },
            });
          });
      });
  }

  // update service
  public updateService(service: Service, images: File[]) {
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
    this.http
      .post<{ imagePaths: string[] }>(this.url + 'service/img/add', serviceData)
      .subscribe((recievedImages) => {
        console.log(recievedImages);
        recievedImages.imagePaths.find((img) => {
          if (currentImg.includes(2)) {
            service.image_03 = img;
            currentImg.pop();
          } else if (currentImg.includes(1)) {
            service.image_02 = img;
            currentImg.pop();
          } else if (currentImg.includes(0)) {
            service.image_01 = img;
            currentImg.pop();
          }
        });
        this.http
          .post<{ message: string; result: Service }>(
            this.url + 'service/edit',
            service
          )
          .subscribe((recievedData) => {
            console.log(recievedData.message);
            console.log(recievedData.result);
            this.service = service;
            this.serviceUpdated.next(this.service);
            this.getServiceProviderServices();
            this.dialog.open(SuccessComponent, {
              data: { message: 'Service Successfully Updated!' },
            });
          });
      });
  }

  // remove service
  public removeService(serviceId: string) {
    console.log(serviceId);
    this.http
      .delete<{ message: string }>(this.url + 'service/edit/' + serviceId)
      .subscribe((recievedData) => {
        const updatedServices = this.serviceProviderServices.filter(
          (prod) => prod.service_id !== serviceId
        );
        this.serviceProviderServices = updatedServices;
        this.serviceProviderServiceUpdated.next([
          ...this.serviceProviderServices,
        ]);
        console.log(recievedData.message);
        this.dialog.open(SuccessComponent, {
          data: { message: 'Service has Removed!' },
        });
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/sp/dash/bprofile']);
        this._snackBar.open('Service :' + serviceId + ' removed!', 'Dismiss', {
          duration: 2500,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
  }

  // add new category by admin
  public addCategory(category: string) {
    this.http
      .post<{ message: string }>(this.url + 'service/cat/add', {
        val: category,
      })
      .subscribe((res) => {
        this.dialog.open(SuccessComponent, {
          data: { message: 'New Service Category has Created!' },
        });
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/admin/categories']);
        this._snackBar.open('New service Category Added!', 'Dismiss', {
          duration: 2500,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
  }

  // remove a category by admin
  public removeCategory(cat: string) {
    this.http
      .post<{ message: string }>(this.url + 'service/cat/remove', {cat})
      .subscribe((res) => {
        this.dialog.open(SuccessComponent, {
          data: { message: 'Service Category deleted!' },
        });
        const updatedCategories = this.categories.filter(
          (catr) => catr.val !== cat
        );
        this.categories = updatedCategories;
        this.categoriesUpdated.next([...this.categories]);
        this._snackBar.open('Category has removed!', 'Dismiss', {
          duration: 2500,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
  }

  // search services
  public searchServices(searchQuery: ServiceQuery) {
    this.http
      .post<{ message: string; services: Service[] }>(
        this.url + 'service/search/all',
        searchQuery
      )
      .subscribe((serviceList) => {
        this.searchedServices = serviceList.services;
        this.searchedServiceUpdated.next([...this.searchedServices]);
        console.log(serviceList.message);
      });
  }

  // search event related services
  public searchEventServices(searchQuery: EventServiceQuery) {
    this.http
      .post<{ message: string; services: Service[] }>(
        this.url + 'service/search/event',
        searchQuery
      )
      .subscribe((serviceList) => {
        this.searchedEventServices = serviceList.services;
        this.searchedEventServiceUpdated.next([...this.searchedEventServices]);
        console.log(serviceList.message);
      });
  }

  // rating a product
  public rateService(id: string, rate: number, review: string) {
    this.http
      .post<{ message: string }>(this.url + 'service/rating/add', {
        id,
        rate,
        review,
      })
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        this.dialog.open(SuccessComponent, {
          data: { message: recievedData.message },
        });
      });
  }

  // add promotion
  public addPromotion(promotion: Promotion, serviceId: string) {
    this.http
      .post<{ message: string }>(this.url + 'service/promotion/add', {
        promotion,
        serviceId,
      })
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/sp/dash/bprofile']);
        this.dialog.open(SuccessComponent, {
          data: { message: recievedData.message },
        });
      });
  }

  // create new booking
  public createBooking(booking: Booking) {
    this.checkAvailability(
      booking.from_date,
      booking.to_date,
      booking.service_id
    ).subscribe((availabilityState) => {
      console.log(availabilityState);
      if (availabilityState.availability) {
        this.http
          .post<{ message: string; bookingId: string }>(
            this.url + 'service/booking/add',
            booking
          )
          .subscribe((recievedData) => {
            console.log(recievedData.message);
            this.router.navigate(['/print/booking/' + recievedData.bookingId]);
            this.sendBooking(
              booking.service_name,
              booking.from_date.slice(0, 10),
              booking.to_date.slice(0, 10)
            );
            this.dialog.open(SuccessComponent, {
              data: {
                message:
                  'Booking Successfull! Your Booking Id: ' +
                  recievedData.bookingId,
              },
            });
          });
      } else {
        this.dialog.open(ErrorComponent, {
          data: {
            message: 'Selected dates are already booked! Please try again',
          },
        });
      }
    });
  }

  // create new event related booking
  public createEventBooking(booking: Booking) {
    this.checkAvailability(
      booking.from_date,
      booking.to_date,
      booking.service_id
    ).subscribe((availabilityState) => {
      if (availabilityState.availability) {
        this.http
          .post<{ message: string; bookingId: string }>(
            this.url + 'service/booking/add',
            booking
          )
          .subscribe((recievedData) => {
            console.log(recievedData.message);
            this.http
              .post<{ message: string }>(this.url + 'service/booking/event', {
                event_id: booking.event_id,
                service_id: booking.service_id,
                service_name: booking.service_name,
                service_category: booking.service_category,
                booking_id: recievedData.bookingId,
                allocated_budget: booking.amount,
                spent_budget: booking.amount,
                booking_from_date: booking.from_date,
                booking_to_date: booking.to_date,
              })
              .subscribe((recievedMsg) => {
                console.log(recievedMsg.message);
                this.router.navigate([
                  '/print/booking/' + recievedData.bookingId,
                ]);
                this.sendBooking(
                  booking.service_name,
                  booking.from_date.slice(0, 10),
                  booking.to_date.slice(0, 10)
                );
                this.dialog.open(SuccessComponent, {
                  data: {
                    message:
                      'Booking Successfull! Your Booking Id: ' +
                      recievedData.bookingId,
                  },
                });
              });
          });
      } else {
        this.dialog.open(ErrorComponent, {
          data: {
            message: 'Selected dates are already booked! Please try again',
          },
        });
      }
    });
  }

  // create new calendar booking
  public createCalendarBooking(booking: Booking) {
        this.http
          .post<{ message: string; bookingId: string }>(
            this.url + 'service/booking/cal/add',
            booking
          )
          .subscribe((recievedData) => {
            console.log(recievedData.message);
            this.dialog.open(SuccessComponent, {
              data: {
                message:
                  'Booking Successfull! Your Booking Id: ' +
                  recievedData.bookingId,
              },
            });
          });
  }

  // create new appointment
  public createAppointment(appointment: Appointment) {
    this.http
      .post<{ message: string; appointId: string }>(
        this.url + 'service/appoint/add',
        appointment
      )
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        this.router.navigate(['/print/appoint/' + recievedData.appointId]);
        this.sendAppointment(
          appointment.service_name,
          appointment.appointed_date.slice(0, 10),
          appointment.appointed_date.slice(11, 16)
        );
        this.dialog.open(SuccessComponent, {
          data: {
            message:
              'Appointment Successfull! Your Appointment Id: ' +
              recievedData.appointId,
          },
        });
      });
  }

  // create new  event related appointment
  public createEventAppointment(appointment: Appointment) {
    this.http
      .post<{ message: string; appointId: string }>(
        this.url + 'service/appoint/add',
        appointment
      )
      .subscribe((recievedData) => {
        this.http
          .post<{ message: string }>(this.url + 'service/appoint/event', {
            event_id: appointment.event_id,
            service_id: appointment.service_id,
            appoint_id: appointment.appoint_id,
            service_name: appointment.service_name,
            service_category: appointment.service_category,
            appointed_date: appointment.appointed_date,
          })
          .subscribe((recievedMsg) => {
            console.log(recievedMsg.message);
            this.router.navigate(['/print/appoint/' + recievedData.appointId]);
            this.sendAppointment(
              appointment.service_name,
              appointment.appointed_date.slice(0, 10),
              appointment.appointed_date.slice(11, 16)
            );
            this.dialog.open(SuccessComponent, {
              data: {
                message:
                  'Appointment Successfull! Your Appointment Id: ' +
                  recievedData.appointId,
              },
            });
          });
      });
  }

  // check booking availability
  public checkAvailability(fromDate: string, toDate: string, serviceId: string) {
    console.log(fromDate, toDate);
    return this.http.post<{ message: string; availability: boolean }>(
      this.url + 'service/booking/check',
      { fromDate, toDate, serviceId }
    );
  }


   // listners for subjects
   public getServiceUpdateListener() {
    return this.serviceUpdated.asObservable();
  }

  public getBookingsUpdateListener() {
    return this.bookingsUpdated.asObservable();
  }

  public getSearchedServiceUpdatedListener() {
    return this.searchedServiceUpdated.asObservable();
  }

  public getSearchedEventServiceUpdatedListener() {
    return this.searchedEventServiceUpdated.asObservable();
  }

  public getServiceProviderServiceUpdateListener() {
    return this.serviceProviderServiceUpdated.asObservable();
  }

  public getservicesUpdateListener() {
    return this.servicesUpdated.asObservable();
  }

  public getCategoriesUpdateListener() {
    return this.categoriesUpdated.asObservable();
  }

  public getLocationsUpdateListener() {
    return this.locationsUpdated.asObservable();
  }

  public getServiceNamesUpdatedListener() {
    return this.serviceNamesUpdated.asObservable();
  }



  // realtime notifications with socket.io

  // trigger booking created event realtime for interested listeners
  public newBookingCreated() {
    const observable = new Observable<{
      service: string;
      fromDate: string;
      toDate: string;
    }>((observer) => {
      this.socket.on('booking add', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  // emit socket once a booking is created
  public sendBooking(service: string, fromDate: string, toDate: string) {
    this.socket.emit('booking-add', { service, fromDate, toDate });
  }

  // emit socket once a booking is created
  public sendAppointment(
    service: string,
    appointedDate: string,
    appointedtime: string
  ) {
    this.socket.emit('appoint-add', { service, appointedDate, appointedtime });
  }

  // appointment handeling
  public newApointCreated() {
    const observable = new Observable<{
      service: string;
      appointedDate: string;
      appointedTime: string;
    }>((observer) => {
      this.socket.on('appoint add', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}
