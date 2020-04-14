import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ProductInventory, ProductCategories } from '../seller.model';

@Component({
  selector: 'app-seller-inventory',
  templateUrl: './seller-inventory.component.html',
  styleUrls: ['./seller-inventory.component.scss']
})
export class SellerInventoryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'product', 'category', 'current_inventory', 'availability', 'action'];
  dataSource: MatTableDataSource<ProductInventory>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  products: ProductInventory[] = [
    { product_id: 'P-01',
      product: 'Setty Back',
      product_category: 'Wedding Eq',
      qty_type: 'Units',
      availability: true,
      inventory: 24,
      delivery_service: 'DHL',
      price: 12499.00},
  ];

  categories: ProductCategories[] = [
    {id: '1', val: 'Wedding Eq'},
    {id: '1', val: 'Flowers'},
    {id: '1', val: 'Catering'},
    {id: '1', val: 'Tents'},
  ];


  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.products);
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
    if (this.products.length) {
      return true;
    } else {
      return false;
    }
  }



}
