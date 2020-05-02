import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Product, ProductCategories, QuantityTypes } from '../product.model';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit, OnDestroy {

  private productSub: Subscription ;
  private categorySub: Subscription ;
  private quantitySub: Subscription ;
  private lastIdSub: Subscription;

  // images to upload
  image01: File;
  image01Url: any = './assets/images/merchant/nopic.png';
  image02: File;
  image02Url: any = './assets/images/merchant/nopic.png';
  image03: File;
  image03Url: any = './assets/images/merchant/nopic.png';

  // business name is send by parent comp for adding a new product
  @Input() businessName = 'Test Business';

  // recieved categories
  categories: ProductCategories[] = [];

  // recieved quantities
  quantities: QuantityTypes[] = [];


  // last product id of the list
  private lastId: string;

  constructor(private router: Router,
              public productService: ProductService,
              public datepipe: DatePipe) { }

  ngOnInit() {
    // get the product id of last product
      this.productService.getLastProductId();
      this.lastIdSub = this.productService.getLastIdUpdateListener()
        .subscribe((recievedId: string) => {
          this.lastId = recievedId;
          console.log(this.lastId);
      });


    // import categories
      this.productService.getCategories();
      this.categorySub = this.productService.getCategoriesUpdateListener()
        .subscribe((recievedData: ProductCategories[]) => {
        this.categories = recievedData;
        console.log(this.categories);
      });

    // import quantity types
      this.productService.getQuantities();
      this.quantitySub = this.productService.getQuantitiesUpdateListener()
         .subscribe((recievedData: QuantityTypes[]) => {
         this.quantities = recievedData;
         console.log(this.quantities);
      });
  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
    this.categorySub.unsubscribe();
    this.quantitySub.unsubscribe();
    this.lastIdSub.unsubscribe();
    this.image01Url = './assets/images/merchant/nopic.png';
    this.image02Url = './assets/images/merchant/nopic.png';
    this.image03Url = './assets/images/merchant/nopic.png';
    this.image01 = null;
    this.image02 = null;
    this.image03 = null;
  }

    // add new product
    createProduct(addProductForm: NgForm) {
      if (addProductForm.invalid) {
        console.log('Form Invalid');
      } else {

        const product: Product = {
          product_id: this.generateProductId(this.lastId),
          business_name:  this.businessName,
          product: addProductForm.value.product,
          product_category: addProductForm.value.category,
          qty_type: addProductForm.value.quantity_type,
          description: addProductForm.value.description,
          created_date: this.convertDate(),
          created_time: this.convertTime(),
          availability: this.booleanValue(addProductForm.value.availability),
          inventory:  addProductForm.value.inventory,
          rating: 0,
          no_of_ratings: 0,
          no_of_orders: 0,
          delivery_service: 'Not Assigned',
          price:  addProductForm.value.price,
          pay_on_delivery:  this.booleanValue(addProductForm.value.pay_on_delivery),
          image_01: './assets/images/merchant/nopic.png',
          image_02: './assets/images/merchant/nopic.png',
          image_03: './assets/images/merchant/nopic.png',
          };
        this.productService.addProduct(product, [this.image01, this.image02, this.image03]);
        addProductForm.resetForm();
        this.image01Url = './assets/images/merchant/nopic.png';
        this.image02Url = './assets/images/merchant/nopic.png';
        this.image03Url = './assets/images/merchant/nopic.png';
      }
    }

    // to get date for created date
  convertDate() {
    const date = new Date();
    return this.datepipe.transform( date, 'dd/MM/yyyy').toString();
  }

  // to get time for the created time
  convertTime() {
    const date = new Date();
    return this.datepipe.transform( date, 'shortTime').toString();
  }

  // image 01 uploading
  onImage01Uploaded(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.image01 = file;
      this.image01Url = reader.result;
    };
  }

    // image 02 uploading
    onImage02Uploaded(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
      const mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image02 = file;
        this.image02Url = reader.result;
      };
    }

      // image 03 uploading
  onImage03Uploaded(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.image03 = file;
      this.image03Url = reader.result;
    };
  }

  generateProductId(productId: string): string {
    let mId = +(productId.slice(1));
    console.log(mId);
    ++mId;
    return 'P' + mId.toString();
  }

  booleanValue(value: any) {
    if (value ===  '') {
      return false;
    } else {return value; }
  }

}
