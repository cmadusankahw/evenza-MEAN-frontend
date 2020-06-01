import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { DeliveryService } from '../../product/product.model';

@Component({
  selector: 'app-seller-delivery',
  templateUrl: './seller-delivery.component.html',
  styleUrls: ['./seller-delivery.component.scss']
})
export class SellerDeliveryComponent implements OnInit {


  displayedColumns: string[] = ['id', 'name', 'rate', 'hotline', 'action'];
  dataSource: MatTableDataSource<DeliveryService>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // make editable
  editmode = false;

  // add new delivery service
  addnew = false;

 // to be edited
  deliveryServices: DeliveryService[] = [
    {
      delivery_service: 'D-01',
      title: 'DHL',
      email: 'sample@123.com',
      address: 'Main Street, Colombo 07',
      hotline: '713456678',
      delivery_rate: 300.00,
      min_delivery_time: 1,
      max_delivery_time: 3
    },
  ];


  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.deliveryServices);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  hasData() {
    if (this.deliveryServices.length) {
      return true;
    } else {
      return false;
    }
  }

}
