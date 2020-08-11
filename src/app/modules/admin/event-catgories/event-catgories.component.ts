
import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { EventCategory, Category } from '../../event/event.model';
import { EventService } from '../../event/event.service';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../../service/service.service';
import { ProductService } from '../../product/product.service';

@Component({
  selector: 'app-event-catgories',
  templateUrl: './event-catgories.component.html',
  styleUrls: ['./event-catgories.component.scss']
})
export class EventCatgoriesComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['category', 'action'];
  dataSource: MatTableDataSource<EventCategory>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // subscritions
  private categorySub: Subscription;

  private serviceCategorySub: Subscription;

  private productCategorySub: Subscription;


  // recived categories
  categories: EventCategory[] = [];

  // service & product categories
  serviceCategories: any[] = [];
  productCategories: any[] = [];

  // selected category
  selectedCategory: EventCategory;

  // category list to be published
  tempServeCategories: Category[] = [];
  tempProdCategories: Category[] = [];

  // selected category id
  selectedCatId = '';

  editmode = false;

  // imge upload
  image: File;
  imgUrl: any = './assets/images/merchant/nopic.png';



  constructor(private eventService: EventService, private serviceService: ServiceService, private productService: ProductService) { }

  ngOnInit() {
    this.eventService.getEventCategories();
    this.categorySub = this.eventService.getEventCategoriesUpdatedListener().subscribe(
      cat => {
        if (cat) {
          this.categories = cat;
          console.log(this.categories);
          this.dataSource = new MatTableDataSource(this.categories);
          this.dataSource.paginator = this.paginator;
        }
      });

    this.serviceService.getCategories();
    this.serviceCategorySub = this.serviceService.getCategoriesUpdateListener().subscribe(
      cat => {
        if (cat) {
          for (const c of cat) {
            this.serviceCategories.push({ ...c, amt: 0 });
          }

          console.log(this.serviceCategories);
        }
      });

    this.productService.getCategories();
    this.categorySub = this.productService.getCategoriesUpdateListener().subscribe(
      cat => {
        if (cat) {
          for (const c of cat) {
            this.productCategories.push({ ...c, amt: 0 });
          }
          console.log(this.productCategories);
        }
      });

  }

  ngOnDestroy() {
    if (this.categorySub) {
      this.categorySub.unsubscribe();
    }
    if (this.productCategorySub) {
      this.productCategorySub.unsubscribe();
    }
    if (this.serviceCategorySub) {
      this.serviceCategorySub.unsubscribe();
    }
  }


  // get selected appointment details
  selectCategory(id: string) {
    for (const app of this.categories) {
      if (app.id === id) {
        this.selectedCategory = app;
      }
    }
  }


  // add categories
  addCategory(catForm: NgForm) {
    if (catForm.invalid) {
      console.log('Form Invalid!');
    } else {
      const newCatedory: EventCategory = {
        id: catForm.value.category.replace(' ', '') + Math.abs(Math.random() * 100),
        category: catForm.value.category,
        img: './assets/images/merchant/nopic',
        services: this.tempServeCategories,
        products: this.tempProdCategories
      };
      this.eventService.createCategory(newCatedory, this.image);
      console.log(newCatedory);
    }
  }

  removeCategory(id: string) {
    this.eventService.removeCategory(id);
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
      this.imgUrl = reader.result;
    };
  }

  addCategoryItem(type: string, cat: string, val: any) {
    val = Number(val);
    if (type === 'service') {
      this.tempServeCategories.push({
        id: new Date().toISOString(),
        category: cat,
        precentage: val
      });
      console.log(this.tempServeCategories);
    }
    if (type === 'product') {
      this.tempProdCategories.push({
        id: new Date().toISOString(),
        category: cat,
        precentage: val
      });
    }
    console.log(this.tempProdCategories);
  }

  checkItem(type: string, cat: string): boolean {
    if (type === 'service') {
      for (const c of this.tempServeCategories) {
        if (c.category === cat) {
          return true;
        }
      }
    }
    if (type === 'product') {
      for (const c of this.tempProdCategories) {
        if (c.category === cat) {
          return true;
        }
      }
    }
    return false;
  }

}
