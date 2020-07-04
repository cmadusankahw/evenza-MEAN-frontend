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
  styleUrls: ['./seller-delivery.component.scss']
})
export class SellerDeliveryComponent implements OnInit, OnDestroy {


  displayedColumns: string[] = ['id', 'name', 'rate', 'hotline', 'action'];
  dataSource: MatTableDataSource<DeliveryService>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private deliverySub: Subscription;

  // make editable
  editmode = false;

  // add new delivery service
  addnew = false;

 // to be edited
  deliveryServices: DeliveryService[] = [];

  deliveryService: DeliveryService;


  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getDeliveryServices();
    this.deliverySub = this.productService.getdeliveryServicesUpdateListener()
      .subscribe ((res: DeliveryService[]) => {
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
