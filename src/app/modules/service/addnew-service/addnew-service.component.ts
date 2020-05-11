import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Service, ServiceCategories, ServiceRates } from '../service.model';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-addnew-service',
  templateUrl: './addnew-service.component.html',
  styleUrls: ['./addnew-service.component.scss']
})
export class AddnewServiceComponent implements OnInit, OnDestroy {

  private serviceSub: Subscription ;
  private categorySub: Subscription ;
  private ratesSub: Subscription ;
  private lastIdSub: Subscription;

   // images to upload
   image01: File;
   image01Url: any = './assets/images/merchant/nopic.png';
   image02: File;
   image02Url: any = './assets/images/merchant/nopic.png';
   image03: File;
   image03Url: any = './assets/images/merchant/nopic.png';

   // business name is send by parent comp for adding a new product
   @Input() businessName = 'Test Business';

   // recieved categories
   categories: ServiceCategories[] = [];

   // recieved quantities
   rates: ServiceRates[] = [];


  // last product id of the list
  private lastId: string;

  constructor(private router: Router,
              public serviceService: ServiceService,
              public datepipe: DatePipe) { }


  ngOnInit() {
  // get the product id of last product
    this.serviceService.getLastServiceId();
    this.lastIdSub = this.serviceService.getLastIdUpdateListener()
      .subscribe((recievedId: string) => {
        this.lastId = recievedId;
        console.log(this.lastId);
    });


  // import categories
    this.serviceService.getCategories();
    this.categorySub = this.serviceService.getCategoriesUpdateListener()
      .subscribe((recievedData: ServiceCategories[]) => {
      this.categories = recievedData;
      console.log(this.categories);
    });

  // import quantity types
    this.serviceService.getRates();
    this.ratesSub = this.serviceService.getRatesUpdateListener()
      .subscribe((recievedData: ServiceRates[]) => {
      this.rates = recievedData;
      console.log(this.rates);
    });
}

ngOnDestroy() {
  if (this.serviceSub) {
    this.serviceSub.unsubscribe();
  }
  if (this.categorySub){
    this.categorySub.unsubscribe();
  }
  if (this.ratesSub) {
    this.ratesSub.unsubscribe();
  }
  if (this.lastIdSub){
    this.lastIdSub.unsubscribe();
  }
  this.image01Url = './assets/images/merchant/nopic.png';
  this.image02Url = './assets/images/merchant/nopic.png';
  this.image03Url = './assets/images/merchant/nopic.png';
  this.image01 = null;
  this.image02 = null;
  this.image03 = null;
}

// add new service
createService(addServiceForm: NgForm) {
  if (addServiceForm.invalid) {
    console.log('Form Invalid');
  } else {

    const service: Service = {
      service_id: this.generateServiceId(this.lastId),
      service_name: addServiceForm.value.service_name,
      business_name:  this.businessName,
      description: addServiceForm.value.description,
      service_category: addServiceForm.value.category,
      available_booking: this.booleanValue(addServiceForm.value.available_booking),
      available_appoints: this.booleanValue(addServiceForm.value.available_appoints),
      rating: 0,
      no_of_ratings: 0,
      no_of_bookings: 0,
      no_of_appoints: 0,
      created_date: this.convertDate(),
      created_time: this.convertTime(),
      rate:  addServiceForm.value.rate,
      rate_type: addServiceForm.value.rate_type,
      pay_on_meet:  this.booleanValue(addServiceForm.value.pay_on_meet),
      image_01: './assets/images/merchant/nopic.png',
      image_02: './assets/images/merchant/nopic.png',
      image_03: './assets/images/merchant/nopic.png'
      };
    this.serviceService.addService(service, [this.image01, this.image02, this.image03]);
    addServiceForm.resetForm();
    this.image01Url = './assets/images/merchant/nopic.png';
    this.image02Url = './assets/images/merchant/nopic.png';
    this.image03Url = './assets/images/merchant/nopic.png';
  }
}

// to get date for created date
convertDate() {
const date = new Date();
return this.datepipe.transform( date, 'dd/MM/yyyy').toString();
}

// to get time for the created time
convertTime() {
const date = new Date();
return this.datepipe.transform( date, 'shortTime').toString();
}

// image 01 uploading
onImage01Uploaded(event: Event) {
const file = (event.target as HTMLInputElement).files[0];
const mimeType = file.type;
if (mimeType.match(/image\/*/) == null) {
  return;
}
const reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = () => {
  this.image01 = file;
  this.image01Url = reader.result;
};
}

// image 02 uploading
onImage02Uploaded(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  const mimeType = file.type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    this.image02 = file;
    this.image02Url = reader.result;
  };
}

  // image 03 uploading
onImage03Uploaded(event: Event) {
const file = (event.target as HTMLInputElement).files[0];
const mimeType = file.type;
if (mimeType.match(/image\/*/) == null) {
  return;
}
const reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = () => {
  this.image03 = file;
  this.image03Url = reader.result;
};
}

generateServiceId(serviceId: string): string {
let mId = +(serviceId.slice(1));
console.log(mId);
++mId;
return 'S' + mId.toString();
}


booleanValue(value: any) {
  if (value ===  '' || value === null || value === undefined) {
    return false;
  } else {return value; }
}

}
