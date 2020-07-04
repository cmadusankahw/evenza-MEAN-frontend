import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Product, DeliveryService, ProductCategories } from '../../product/product.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../../product/product.service';

@Component({
  selector: 'app-seller-inventory',
  templateUrl: './seller-inventory.component.html',
  styleUrls: ['./seller-inventory.component.scss']
})
export class SellerInventoryComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'product', 'category', 'current_inventory', 'availability', 'action'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // subscriptions
  private productSub: Subscription;
  private categorySub: Subscription;


  products: Product[] = [];

  deliveryServices: DeliveryService[] = [];

  categories: ProductCategories[] = [];

  selectedProduct: Product;


  constructor(private router: Router,
              private productService: ProductService) { }

  ngOnInit() {
    this.productService.getSellerProducts();
    this.productSub = this.productService.getSellerProductUpdateListener()
          .subscribe((res: Product[]) => {
            this.products = res;
            console.log(this.products);
            if (this.products) {
              this.dataSource = new MatTableDataSource(this.products);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
           }
      });
    this.productService.getCategories();
    this.categorySub = this.productService.getCategoriesUpdateListener()
        .subscribe ((res: ProductCategories[]) => {
          if (res) {
            this.categories = res;
            console.log(this.categories);
          }
      });
  }

  ngOnDestroy() {
    if(this.productSub) {
      this.productSub.unsubscribe();
    }
    if (this.categorySub) {
      this.categorySub.unsubscribe();
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
  showProductDetaails(prodId: string) {
    for (const app of this.products) {
      if (app.product_id === prodId) {
        this.selectedProduct = app;
      }
    }
    console.log(this.selectedProduct);
  }

  // update inventory
  updateProduct(prod: Product) {
    this.productService.updateOnlyProduct(prod);
  }


}
