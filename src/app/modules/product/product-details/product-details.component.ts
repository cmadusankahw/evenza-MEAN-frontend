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

  // product id form product cards component
  @Input() productId = 'P-01';

  // service is editable by parent comp
  @Input() isowner = false;

  // edit mode by parent comp
  editmode = false;

  // add new service mode by parent comp
  @Input() addnew = false;

  // business name is send by parent comp for adding a new product
  @Input() businessName = 'Tesst Business';



  // images to upload
  image01: File;
  image01Url: any = './assets/images/merchant/nopic.png';
  image02: File;
  image02Url: any = './assets/images/merchant/nopic.png';
  image03: File;
  image03Url: any = './assets/images/merchant/nopic.png';

  // recieved product
  product: Product = {
      product_id: null,
      business_name: null,
      product: null,
      product_category: null,
      qty_type: null,
      description: '',
      created_date: null,
      created_time: null,
      availability: false,
      inventory: 0,
      rating: 0,
      no_of_ratings: 0,
      no_of_orders: 0,
      delivery_service: null,
      price: 0,
      payment_type: null,
      image_01: null,
      image_02: null,
      image_03: null
    };


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
    // get the product id not 'add new' mode
    if (!this.addnew) {
      this.productService.getProduct(this.productId);
      this.productSub = this.productService.getProductUpdateListener()
        .subscribe((recievedProduct: Product) => {
          if (recievedProduct === null || recievedProduct === undefined ) {
            return;
          } else {
            this.product = recievedProduct;
            console.log(this.product);
          }
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
  }

  // add new product
  createProduct(addProductForm: NgForm) {
    if (addProductForm.invalid) {
      console.log('Form Invalid');
    } else {

      const product: Product = {
        product_id: 'P-01',
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
        image_01:  addProductForm.value.image_01,
        image_02:  addProductForm.value.image_02,
        image_03:  addProductForm.value.image_03,
        };
      this.productService.addProduct(product);
      console.log(product);
      addProductForm.resetForm();
    }
  }

  // update product
  updateProduct(updateProductForm: NgForm, productId) {
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
        image_01:  updateProductForm.value.image_01,
        image_02:  updateProductForm.value.image_02,
        image_03:  updateProductForm.value.image_03,
        };

      console.log(product);
      this.productService.updateProduct(product, productId);
      this.productSub = this.productService.getProductUpdateListener()
      .subscribe((recievedProduct: Product) => {
      this.product = recievedProduct;
    });
      console.log('Product updated successfully!');
      updateProductForm.resetForm();
    }
  }

  // remove product
  removeProduct(productId: string) {
    console.log('product removed');
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

  showBprofile() {
    this.router.navigate(['/sp/bprofile']);
  }

  // image uploading
  onImage01Uploaded(event) {
    const file = event.target.files[0];
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

  // image uploading
  onImage02Uploaded(event) {
    const file = event.target.files[0];
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

  // image uploading
  onImage03Uploaded(event) {
    const file = event.target.files[0];
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


}
