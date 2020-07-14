import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { EventCategory, TheEvent, Category } from '../event.model';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

  private catSub: Subscription;
  private eventSub: Subscription;

  // recieved  Id
  Id: string;

  // event dates
  tday = new Date();

    // feature image upload
    imageUrl: any = './assets/images/events/feature.jpg';
    image: File;

  // created event
  createdEvent = {
    event_title: 'My first Event',
    description: null,
    event_type: 'open',
    event_category: '',
    from_date: this.tday.toISOString(),
    to_date: this.tday.toISOString(),
    location: {lat: 0, lang: 0, homeTown: ''},
    total_budget: 0,
    no_of_participants: 1,
    service_categories: [],
    product_categories: [],
    feature_img: this.imageUrl,
    social_links: {
      fb: 'https://fb.com/',
      instagram: 'https://instagram.com/',
      other: ''
    }
  };

  // recieved Event category
  eventCategory: EventCategory = {
    id: null,
    category: '',
    img: '',
    services: [],
    products: []
  };

  times = { fromTime: {hour: 8, minute: 0, second: 0}, toTime: {hour: 16, minute: 0, second: 0}};

  dates = { fromDate: this.tday, toDate: this.tday};

  // edit mode
  @Input() editmode = false;

  constructor(private router: Router,
              private eventService: EventService,
              private route: ActivatedRoute) {
                this.Id = route.snapshot.params.id;
              }

  ngOnInit() {
     if (this.route.snapshot.url[1].path === 'add') {
     // get the categories
     this.eventService.getEventCategory(this.Id);
     this.catSub = this.eventService.getEventCategoryUpdatedListener()
       .subscribe((recievedCategory: EventCategory) => {
         if (recievedCategory) {
           this.createdEvent.event_category = recievedCategory.category;
           this.eventCategory = recievedCategory;
           console.log( this.eventCategory);
         }
    });
    } else if (this.route.snapshot.url[1].path === 'edit') {
      // get the event
      this.eventService.getEvent(this.Id);
      this.eventSub = this.eventService.getEventUpdatedListener()
      .subscribe((recievedData: TheEvent) => {
        this.eventCategory.services = recievedData.service_categories;
        this.eventCategory.products = recievedData.product_categories;
        this.eventCategory.category = recievedData.event_category;
        this.createdEvent = recievedData;
        this.editmode = true;
        console.log(this.createdEvent);
    });
    }
  }

ngOnDestroy() {
      if (this.catSub) {
          this.catSub.unsubscribe();
      }
      if (this.eventSub) {
        this.eventSub.unsubscribe();
    }
  }

createEvent() {
    console.log('submitted');
  }

updateEvent() {

  }

  // image 03 uploading
  onImageUploaded(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.image = file;
      this.createdEvent.feature_img = reader.result;
    };
  }

  addProductCategoryItem( item: Category) {
    if (this.createdEvent.product_categories.includes(item)) {
      this.createdEvent.product_categories =  this.createdEvent.product_categories.filter((a) => a === item);
      console.log(item.category + ' removed');
    } else {
      this.createdEvent.product_categories.push(item);
      console.log(item.category + ' added');
    }
  }

  addServiceCategoryItem( item: Category) {
    if (this.createdEvent.service_categories.includes(item)) {
      this.createdEvent.service_categories =  this.createdEvent.service_categories.filter((a) => a === item);
      console.log(item.category + ' removed');
    } else {
      this.createdEvent.service_categories.push(item);
      console.log(item.category + ' added');
    }
  }

  refactorDates(){
    if(this.dates.fromDate){
      this.createdEvent.from_date = this.dates.fromDate.toISOString();
    }
    if(this.dates.toDate){
      this.createdEvent.to_date = this.dates.toDate.toISOString();
    }

    // code to add imes to the ISO String

  }

}
