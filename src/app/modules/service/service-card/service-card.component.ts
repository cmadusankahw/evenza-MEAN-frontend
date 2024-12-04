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
  private serviceSub: Subscription;

  // service card ownership
  @Input() isowner = false;

  // filtering
  @Input() category = 'any';

  // business name
  @Input() businessName: string;

  // to pass to the service details
  @Input() islogged: boolean;

  // services list
  services: Service[] = [];

  // show service details once loaded
  success = false;


  constructor(private router: Router,
              public serviceService: ServiceService) { }

  ngOnInit() {
    // get the service
    if (this.isowner) {
      this.serviceService.getServiceProviderServices();
      this.serviceSub = this.serviceService.getServiceProviderServiceUpdateListener()
        .subscribe((recievedServices: Service[]) => {
          this.services = recievedServices;
          console.log(this.services);
        });
    } else {
      this.serviceService.getServices();
      this.serviceSub = this.serviceService.getservicesUpdateListener()
        .subscribe((recievedServices: Service[]) => {
          this.services = recievedServices;
          console.log(this.services);
        });
    }

  }

  ngOnDestroy() {
    if (this.serviceSub) {
      this.serviceSub.unsubscribe();
    }
  }

  // set selectedservice to view details
  sendService(service: Service) {
    this.success = this.serviceService.setService(service);
  }

}
