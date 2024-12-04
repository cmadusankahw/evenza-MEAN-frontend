import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { DeliveryService } from '../../product/product.model';
import { ProductService } from '../../product/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-seller-delivery',
  templateUrl: './seller-delivery.component.html',
  styleUrls: ['./seller-delivery.component.scss'],
})
export class SellerDeliveryComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [ 'name', 'rate', 'hotline', 'action'];
  dataSource: MatTableDataSource<DeliveryService>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private deliverySub: Subscription;
  // make editable
  public editmode = false;
  // recieved delivery services
  public deliveryServices: DeliveryService[] = [];
  // selected delivery service
  public deliveryService: DeliveryService;
  // new delivery service
  public newService: DeliveryService = {
    delivery_service: '',
    title: '',
    email: '',
    address: '',
    hotline: '',
    min_delivery_time: 2,
    max_delivery_time: 3,
    delivery_rate: 0,
  };

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getDeliveryServices();
    this.deliverySub = this.productService
      .getdeliveryServicesUpdateListener()
      .subscribe((res: DeliveryService[]) => {
        if (res) {
          this.deliveryServices = res;
          console.log(this.deliveryServices);
          if (this.deliveryServices) {
            this.dataSource = new MatTableDataSource(this.deliveryServices);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        }
      });
  }

  ngOnDestroy() {
    if (this.deliverySub) {
      this.deliverySub.unsubscribe();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // add new delivery service
  addDeliveryService(deliveryService: DeliveryService) {
    deliveryService.delivery_service =
      deliveryService.title.replace(' ', '_') +
      new Date().toISOString() +
      '_' +
      Math.abs(Math.random() * 100);
    this.productService.addDeliveryService(deliveryService);
  }

  // edit selected delivery service
  editDeliveryService(deliveryService: DeliveryService) {
    this.productService.editDeliveryService(deliveryService);
  }

  // get selected product details
  showDeliveryDetails(diliveryId: string) {
    for (const app of this.deliveryServices) {
      if (app.delivery_service === diliveryId) {
        this.deliveryService = app;
      }
    }
    console.log(this.deliveryService);
  }
}
