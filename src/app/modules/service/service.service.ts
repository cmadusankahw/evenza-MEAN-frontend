import { Service, ServiceCategories, ServiceRates } from './service.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ServiceService  {

  private serviceUpdated = new Subject<Service>();
  private servicesUpdated = new Subject<Service[]>();
  private lastIdUpdated = new Subject<string>();
  private ratesUpdated = new Subject<ServiceRates[]>();
  private categoriesUpdated = new Subject<ServiceCategories[]>();

  // to add services
  private services: Service[] = [];

  // to generate rates list
  private rates: ServiceRates[] = [];

  // to generate quanitties list
  private categories: ServiceCategories[] = [];

  // api url (to be centralized)
  url = 'http://localhost:3000/api/';

  // to render selected service
  private service: Service;

  // to get the very last id of the service list
  private lastId: string;

  constructor(private http: HttpClient) { }


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
    this.http.get<{ message: string, rates: ServiceRates[] }>(this.url + 'service/rt')
    .subscribe((ratesList) => {
      this.rates = ratesList.rates;
      this.ratesUpdated.next([...this.rates]);
    });
  }

  // get last service id
  getLastServiceId() {
    this.http.get<{ lastid: string }>(this.url + 'service/last')
    .subscribe((recievedId) => {
      console.log(recievedId.lastid);
      this.lastId = recievedId.lastid;
      this.lastIdUpdated.next(this.lastId);
    });
  }



  // listners for subjects
  getServiceUpdateListener() {
    return this.serviceUpdated.asObservable();
  }

  getservicesUpdateListener() {
    return this.servicesUpdated.asObservable();
  }

  getRatesUpdateListener() {
    return this.ratesUpdated.asObservable();
  }

  getCategoriesUpdateListener() {
    return this.categoriesUpdated.asObservable();
  }

  getLastIdUpdateListener(){
    return this.lastIdUpdated.asObservable();
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
    this.http.post<{image_01: string, image_02: string, image_03: string}>(this.url + 'service/add/img', serviceData )
      .subscribe ((recievedImages) => {
        console.log(recievedImages);
        if (recievedImages.image_01 !== null) {
          service.image_01 = recievedImages.image_01;
        }
        if (recievedImages.image_02 !== null) {
          service.image_02 = recievedImages.image_02;
        }
        if (recievedImages.image_03 !== null) {
          service.image_03 = recievedImages.image_03;
        }
        this.http.post<{ message: string, result: Service }>(this.url + 'service/add', service)
        .subscribe((recievedData) => {
          console.log(recievedData.message);
          console.log(recievedData.result);
          this.services.push(service);
          this.servicesUpdated.next([...this.services]);
          this.getLastServiceId();
      });
    });
  }

  // update service
  updateService(service: Service, images: File[]) {
    const serviceData = new FormData();
    for (const image of images) {
      if (image) {
        serviceData.append('images[]', image, image.name);
      }
    }
    console.log(serviceData);
    this.http.post<{image_01: string, image_02: string, image_03: string}>(this.url + 'service/add/img', serviceData )
      .subscribe ((recievedImages) => {
      console.log(recievedImages);
      if (recievedImages.image_01 !== null) {
        service.image_01 = recievedImages.image_01;
      }
      if (recievedImages.image_02 !== null) {
        service.image_02 = recievedImages.image_02;
      }
      if (recievedImages.image_03!== null) {
        service.image_03 = recievedImages.image_03;
      }
      this.http.post<{ message: string, result: Service }>(this.url + 'service/edit/' + service.service_id, service)
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        console.log(recievedData.result);
        this.service = service;
        this.serviceUpdated.next(this.service);
    });
  });
  }

  // remove service
  removeService(serviceId: string) {
    console.log(serviceId);
    this.http.delete<{ message: string }>(this.url + 'service/edit/' + serviceId)
      .subscribe((recievedData) => {
        const updatedServices = this.services.filter(prod => prod.service_id !== serviceId);
        this.services = updatedServices;
        this.servicesUpdated.next([...this.services]);
        console.log(recievedData.message);
        this.getLastServiceId();
      });
  }

  // set current service
  setService(service: Service) {
    this.service = service;
    this.serviceUpdated.next(this.service);
    return true;
  }

}
