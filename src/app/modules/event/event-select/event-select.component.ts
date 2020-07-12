import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventCategory } from '../event.model';
import { Router } from '@angular/router';
import { EventService } from '../event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-select',
  templateUrl: './event-select.component.html',
  styleUrls: ['./event-select.component.scss']
})
export class EventSelectComponent implements OnInit, OnDestroy {

    private catSub: Subscription;
  
    eventCategories: EventCategory[] = [];
  
    // selected category
    selectedCategory: EventCategory;
  
  
    constructor(private router: Router,
                private eventService: EventService) {}
  
    ngOnInit() {
        // get the service
        this.eventService.getEventCategories();
        this.catSub = this.eventService.getEventCategoriesUpdatedListener()
          .subscribe((recievedCategories: EventCategory[]) => {
            if (recievedCategories) {
              this.eventCategories = recievedCategories;
              console.log(this.eventCategories);
            }
      });
    }

    ngOnDestroy() {
        if (this.catSub){
            this.catSub.unsubscribe();
        }
    }

  }
