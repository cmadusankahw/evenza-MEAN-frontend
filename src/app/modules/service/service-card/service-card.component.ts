import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Service } from '../service.model';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent implements OnInit, OnDestroy {

  // subscription
  private serviceSub: Subscription ;

  // service card ownership
  @Input() isowner = false;

  // filtering
  @Input() category = 'any';

  // services list
  services: Service[] = [];

  // show service details once loaded
  success = false;


  constructor(private router: Router,
              public serviceService: ServiceService) { }

  ngOnInit() {
     // get the service
     this.serviceService.getServices();
     this.serviceSub = this.serviceService.getservicesUpdateListener()
       .subscribe((recievedServices: Service[]) => {
           this.services = recievedServices;
           console.log(this.services);
   });
  }

  ngOnDestroy() {
    if (this.serviceSub) {
      this.serviceSub.unsubscribe();
    }
  }

  sendService(service: Service) {
    this.success = this.serviceService.setService(service);
   }

  hasData() {
    if (this.services.length) {
      return true;
    } else {
      return false;
    }
  }

}
