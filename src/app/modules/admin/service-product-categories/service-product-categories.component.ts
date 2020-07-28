
import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { ServiceService } from '../../service/service.service';
import { ProductService } from '../../product/product.service';

@Component({
  selector: 'app-service-product-categories',
  templateUrl: './service-product-categories.component.html',
  styleUrls: ['./service-product-categories.component.scss']
})
export class ServiceProductCategoriesComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['category', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // subscritions
  private categorySub: Subscription;

  // recieved category type
  @Input() categoryType = 'service';

  // recived categories
  categories: any[] = [];

  // selected category id
  selectedCat: string = '';

  // new category
  newCategory: string = '';


  constructor( private serviceService: ServiceService, private productService : ProductService) { }

  ngOnInit() {
     // get admin for child comp use
    if ( this.categoryType === 'service') {
     this.serviceService.getCategories();
     this.categorySub = this.serviceService.getCategoriesUpdateListener().subscribe(
      cat => {
        if (cat) {
          this.categories = cat;
          console.log(this.categories);
          this.dataSource = new MatTableDataSource(this.categories);
          this.dataSource.paginator = this.paginator;
        }
      });
    } else if (this.categoryType === 'product') {
      this.productService.getCategories();
      this.categorySub = this.productService.getCategoriesUpdateListener().subscribe(
       cat => {
         if (cat) {
           this.categories = cat;
           console.log(this.categories);
           this.dataSource = new MatTableDataSource(this.categories);
           this.dataSource.paginator = this.paginator;

         }
       });
    }
  }

  ngOnDestroy() {
    if (this.categorySub) {
      this.categorySub.unsubscribe();
    }
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }


// add categories
  addCategory(id: string) {
    if (this.categoryType === 'service'){
      console.log(id);
      this.serviceService.addCategory(id);
    } else if (this.categoryType === 'product'){
      this.productService.addCategory(id);
    }
  }

  removeCategory(id: string) {
    if (this.categoryType === 'service'){
      this.serviceService.removeCategory(id);
    } else if (this.categoryType === 'product'){
      this.productService.removeCategory(id);
    }
  }
}
