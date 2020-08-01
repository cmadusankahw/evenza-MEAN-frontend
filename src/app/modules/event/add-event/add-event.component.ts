import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { EventCategory, TheEvent, Category, refactorDate } from '../event.model';

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
  sampleEvent: TheEvent = {
    event_id: null,
    created_date: null,
    participants: null,
    alerts: null,
    event_segments: null,
    qr_code: '',
    state: 'unpublished',
    host: null,
    event_title: 'My first Event',
    description: null,
    event_type: 'open',
    event_category: '',
    from_date: this.tday.toISOString(),
    to_date: this.tday.toISOString(),
    location: {lat: 0, lang: 0, homeTown: ''},
    total_budget: 0,
    total_spent_budget: 0,
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

  createdEvent: TheEvent;

  // recieved Event category
  eventCategory: EventCategory = {
    id: null,
    category: '',
    img: '',
    services: [],
    products: []
  };

  times = { fromTime: {hour: 8, minute: 0}, toTime: {hour: 16, minute: 0}};

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
     this.createdEvent = this.sampleEvent;
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
        this.eventCategory.category = recievedData.event_category;
        this.createdEvent = recievedData;
        this.imageUrl = this.createdEvent.feature_img;
        this.dates.fromDate = new Date(this.createdEvent.from_date);
        this.dates.toDate = new Date(this.createdEvent.to_date);
        this.times.fromTime = {
          hour: Number(this.createdEvent.from_date.slice(11, 13)),
          minute: Number(this.createdEvent.from_date.slice(14, 16))
        };
        this.times.toTime = {
          hour: Number(this.createdEvent.to_date.slice(11, 13)),
          minute: Number(this.createdEvent.to_date.slice(14, 16))
        };
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

createEvent(eventForm : NgForm) {
  if ( eventForm.valid) {
    const event: TheEvent = {
      event_id: 'E0',
      event_title: this.createdEvent.event_title,
      description: this.createdEvent.description,
      event_type: this.createdEvent.event_type, // open or closed/ online event
      event_category: this.createdEvent.event_category,
      from_date: refactorDate(this.dates.fromDate, this.times.fromTime ),
      to_date: refactorDate(this.dates.toDate, this.times.toTime ),
      created_date: new Date().toISOString(),
      location: this.createdEvent.location,
      no_of_participants: this.createdEvent.no_of_participants,
      participants: {
          participants: [],
          approved_participants: 0},
      alerts: [{
        id: 'A1',
        type: 'invitation', // notification/ invitation
        heading: 'Invitation to Event: ' + this.createdEvent.event_title,
        message: 'We are inviting you to the ' +
        this.createdEvent.event_category + ' : ' + this.createdEvent.event_title + '<br> <br> Edit your Invitation Here',
        created_date: new Date().toISOString(),
        state: 'draft', // sent or draft
        attachments: []
      }],
      total_budget: this.createdEvent.total_budget,
      total_spent_budget: this.createdEvent.total_spent_budget,
      event_segments: {
        tasks: [],
        services: [],
        products: []
      },
      service_categories: this.createdEvent.service_categories, // selected service categories
      product_categories: this.createdEvent.product_categories, // selected product categories
      feature_img: './assets/images/events/feature.jpg',
      qr_code: 'http://evenza.biz/events/' + this.createdEvent.event_title.trim(),
      state: 'unpublished', //  unpublished / published/ cancelled
      social_links: this.createdEvent.social_links,
      host: {
        user_id: '',
        email: '',
        name: ''
      }
    };
    this.eventService.createEvent(event, this.image);
  } else {
    console.log('form invalid');
  }
}

updateEvent(eventForm: NgForm) {
  if ( eventForm.valid) {
    const newevent = this.createdEvent;
    newevent.from_date =  refactorDate(this.dates.fromDate, this.times.fromTime );
    newevent.to_date = refactorDate(this.dates.toDate, this.times.toTime ),
    this.eventService.updateEvent(newevent, this.image);
  } else {
    console.log('form invalid');
  }

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
      this.imageUrl = reader.result;
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
