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

   // availability
   availableBooking = true;
   availableAppoint = false;
   payOnMeet = false;


  constructor(private router: Router,
              public serviceService: ServiceService,
              public datepipe: DatePipe) { }


  ngOnInit() {


  // import categories
    this.serviceService.getCategories();
    this.categorySub = this.serviceService.getCategoriesUpdateListener()
      .subscribe((recievedData: ServiceCategories[]) => {
      this.categories = recievedData;
      console.log(this.categories);
    });

  // import quantity types
    this.rates = this.serviceService.getRates();
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

}

// add new service
createService(addServiceForm: NgForm) {
  if (addServiceForm.invalid) {
    console.log('Form Invalid');
  } else {

    const service: Service = {
      service_id: null,
      service_name: addServiceForm.value.service_name,
      business_name:  this.businessName,
      description: addServiceForm.value.description,
      service_category: addServiceForm.value.category,
      available_booking: this.booleanValue(this.availableBooking),
      available_appoints: this.booleanValue(this.availableAppoint),
      rating: 0,
      reviews: [],
      promotions: [],
      no_of_ratings: 0,
      no_of_bookings: 0,
      no_of_appoints: 0,
      created_date: new Date().toISOString(),
      rate:  addServiceForm.value.rate,
      rate_type: addServiceForm.value.rate_type,
      capacity: addServiceForm.value.capacity,
      pay_on_meet:  this.booleanValue(this.payOnMeet),
      image_01: './assets/images/merchant/nopic.png',
      image_02: './assets/images/merchant/nopic.png',
      image_03: './assets/images/merchant/nopic.png'
      };
    this.serviceService.addService(service, [this.image01, this.image02, this.image03]);
    addServiceForm.resetForm();
    this.clearImages();
  }
}

// clear image cache
clearImages() {
  this.image01Url = './assets/images/merchant/nopic.png';
  this.image02Url = './assets/images/merchant/nopic.png';
  this.image03Url = './assets/images/merchant/nopic.png';
  this.image01 = null;
  this.image02 = null;
  this.image03 = null;
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

booleanValue(value: any) {
  if (value ===  '' || value === null || value === undefined) {
    return false;
  } else {return value; }
}


}
