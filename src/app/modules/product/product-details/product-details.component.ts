import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Product, ProductCategories, QuantityTypes, PaymentTypes } from '../product.model';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  // subscription
  private productSub: Subscription ;
  private categorySub: Subscription ;
  private paymentTypeSub: Subscription ;
  private quantitySub: Subscription ;
  private lastIdSub: Subscription;

  // product id form product cards component
  @Input() productId = 'P3'; // should be replace with test

  // service is editable by parent comp
  @Input() isowner = false;

  // edit mode by parent comp
  editmode = false;

  // add new service mode by parent comp
  @Input() addnew = false;

  // business name is send by parent comp for adding a new product
  @Input() businessName = 'Test Business';


  // images to upload
  image01: File;
  image01Url: any = './assets/images/merchant/nopic.png';
  image02: File;
  image02Url: any = './assets/images/merchant/nopic.png';
  image03: File;
  image03Url: any = './assets/images/merchant/nopic.png';

  // recieved product
  product: Product;

  // last product id of the list
  private lastId: string;

  // product removed
  removed = false;

  // recieved categories
  categories: ProductCategories[] = [];

  // recieved quantities
  quantities: QuantityTypes[] = [];

  // recieved payment types
  paymentTypes: PaymentTypes[] = [];


  constructor(private router: Router,
              public productService: ProductService,
              public datepipe: DatePipe) { }

  ngOnInit() {
   // get the product
    if (!this.addnew) {
      this.productService.getProduct(this.productId);
      this.productSub = this.productService.getProductUpdateListener()
        .subscribe((recievedProduct: Product) => {
            this.product = recievedProduct;
            console.log(this.product);
      });
    }

    // get the product id not 'add new' mode
    if (this.addnew) {
      this.productService.getLastProductId();
      this.lastIdSub = this.productService.getLastIdUpdateListener()
        .subscribe((recievedId: string) => {
          this.lastId = recievedId;
          console.log(this.lastId);
        });
    }

    // import categories
    this.productService.getCategories();
    this.categorySub = this.productService.getCategoriesUpdateListener()
        .subscribe((recievedData: ProductCategories[]) => {
        this.categories = recievedData;
        console.log(this.categories);
    });

    // import payment types
    this.productService.getPaymentTypes();
    this.paymentTypeSub = this.productService.getPaymentTypesUpdateListener()
        .subscribe((recievedData: PaymentTypes[]) => {
        this.paymentTypes = recievedData;
        console.log(this.paymentTypes);
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
    this.paymentTypeSub.unsubscribe();
    this.lastIdSub.unsubscribe();
    this.image01Url = './assets/images/merchant/nopic.png';
    this.image02Url = './assets/images/merchant/nopic.png';
    this.image03Url = './assets/images/merchant/nopic.png';
    this.image01 = null;
    this.image02 = null;
    this.image03 = null;
    this.editmode = false;
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
        availability: addProductForm.value.availability,
        inventory:  addProductForm.value.inventory,
        rating: 0,
        no_of_ratings: 0,
        no_of_orders: 0,
        delivery_service: 'Not Assigned',
        price:  addProductForm.value.price,
        payment_type:  addProductForm.value.payment_type,
        image_01: './assets/images/merchant/nopic.png',
        image_02: './assets/images/merchant/nopic.png',
        image_03: './assets/images/merchant/nopic.png',
        };
      this.productService.addProduct(product, [this.image01, this.image02, this.image03]);
      console.log(product);
      addProductForm.resetForm();
      this.image01Url = './assets/images/merchant/nopic.png';
      this.image02Url = './assets/images/merchant/nopic.png';
      this.image03Url = './assets/images/merchant/nopic.png';
    }
  }

  // update product
  updateProduct(updateProductForm: NgForm) {
    if (updateProductForm.invalid) {
      console.log('Form Invalid');
    } else {
      const product: Product = {
        product_id: this.product.product_id,
        business_name:  this.product.business_name,
        product: updateProductForm.value.product,
        product_category: updateProductForm.value.category,
        qty_type: updateProductForm.value.quantity_type,
        description: updateProductForm.value.description,
        created_date: this.product.created_date,
        created_time: this.product.created_time,
        availability: updateProductForm.value.availability,
        inventory:  updateProductForm.value.inventory,
        rating: this.product.rating,
        no_of_ratings: this.product.no_of_ratings,
        no_of_orders: this.product.no_of_orders,
        delivery_service: this.product.delivery_service,
        price:  updateProductForm.value.price,
        payment_type:  updateProductForm.value.payment_type,
        image_01:  this.product.image_01,
        image_02:  this.product.image_02,
        image_03:  this.product.image_03,
        };
      this.productService.updateProduct(product, [this.image01, this.image02, this.image03]);
      this.productSub = this.productService.getProductUpdateListener()
      .subscribe((recievedProduct: Product) => {
        console.log(recievedProduct);
        this.product = recievedProduct;
      });
      console.log('Product updated successfully!');
      updateProductForm.resetForm();
      this.editmode = false;
    }
  }

  // remove product
  removeProduct() {
    this.productService.removeProduct(this.productId);
    this.removed = true;
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

  // to be modified later (optional function)
  showBprofile() {
    this.router.navigate(['/sp/bprofile']);
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

}
