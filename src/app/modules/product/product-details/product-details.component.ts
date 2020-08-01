import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Product, ProductCategories, QuantityTypes, Order, DeliveryService } from '../product.model';
import { ProductService } from '../product.service';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  // subscription
  private productSub: Subscription ;
  private categorySub: Subscription ;
  private deliveryServiceSub: Subscription;
  // created date
  private today = new Date();

  // service is editable by parent comp
  @Input() public isowner = false;
  // editablity
  @Input() public editable = true;
  // recived values
  @Input() public islogged: boolean;
  // recieved eventId for event based product search
  @Input() public eventId: string;

  // edit mode by parent comp
  public editmode = false;
  // product removed
  public removed = false;
  // order enabled
  public orderUser = false;
  // recieved product
  public product: Product;
  // recieved categories
  public categories: ProductCategories[] = [];
  // recieved quantities
  public quantities: QuantityTypes[] = [];
  // delivery services
  public deliveryServices: DeliveryService[] = [];
  // delivery service of the product
  public delService: DeliveryService;

  // images to upload
  image01: File;
  image01Url: any = './assets/images/merchant/nopic.png';
  image02: File;
  image02Url: any = './assets/images/merchant/nopic.png';
  image03: File;
  image03Url: any = './assets/images/merchant/nopic.png';

  // total amount
  totalAmount = 0.0;
  payAmount = 0.0;
  qty = 1;


  constructor(private router: Router,
              public productService: ProductService,
              public dialog: MatDialog,
              public datepipe: DatePipe) { }

  ngOnInit() {
   // get the product
      this.productService.getProduct();
      this.productSub = this.productService.getProductUpdateListener()
        .subscribe((recievedProduct: Product) => {
          if (recievedProduct) {
            this.product = recievedProduct;
            console.log(this.product);
            this.removed = false;
            this.editmode = false;

             // import delivery services
            this.productService.getDeliveryServices();
            this.deliveryServiceSub = this.productService.getdeliveryServicesUpdateListener()
               .subscribe((recievedData: DeliveryService[]) => {
               this.deliveryServices = recievedData;
               console.log(this.deliveryServices);
               this.delService = this.getDeliveryService(this.product.delivery_service);
            });

            if (this.editable === true) {
              // import categories
                this.productService.getCategories();
                this.categorySub = this.productService.getCategoriesUpdateListener()
                  .subscribe((recievedData: ProductCategories[]) => {
                  this.categories = recievedData;
                  console.log(this.categories);
              });

            // import quantity types
                this.quantities = this.productService.getQuantities();

              }

            // check for recieved eventId
            if (this.eventId) {
                console.log(this.eventId);
              }
          }
    });

  }

  ngOnDestroy() {
    if (this.productSub) {
      this.productSub.unsubscribe();
    }
    if (this.categorySub) {
      this.categorySub.unsubscribe();
    }

    if (this.deliveryServiceSub) {
      this.deliveryServiceSub.unsubscribe();
    }
    this.clearImages();
    this.editmode = false;
    this.removed = false;
  }

  // create an order
  createOrder(orderForm: NgForm ) {
    if (orderForm.invalid) {
      console.log('Form Invalid');
    } else {
      this.calcPayment(this.product.price, this.qty);
      const order: Order = {
        order_id: 'OR0',
        product_id: this.product.product_id,
        product: this.product.product,
        event_id: 'none',
        qty_type: this.product.qty_type,
        product_category: this.product.product_category,
        business_name: this.product.business_name,
        delivery_address: orderForm.value.delivery_address,
        created_date: new Date().toISOString(),
        state: 'pending',
        review: 'not reviewed yet',
        quantity: this.qty,
        comment: orderForm.value.comment,
        amount: this.totalAmount,
        commission_due: this.totalAmount / 10,
        amount_paid: orderForm.value.amount_paid,
        delivery_service: this.getDeliveryService(this.product.delivery_service)
        };

      if (this.eventId) {
          order.event_id = this.eventId;
          this.productService.createEventOrder(order);
      } else {
          this.productService.createOrder(order);
      }
      console.log(order);
      this.orderUser = !this.orderUser;
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
        availability: this.product.availability,
        inventory:  updateProductForm.value.inventory,
        rating: this.product.rating,
        reviews: this.product.reviews,
        no_of_ratings: this.product.no_of_ratings,
        no_of_orders: this.product.no_of_orders,
        delivery_service: updateProductForm.value.delivery_service,
        price:  updateProductForm.value.price,
        pay_on_delivery:  this.product.pay_on_delivery,
        image_01:  this.product.image_01,
        image_02:  this.product.image_02,
        image_03:  this.product.image_03,
        };
      this.productService.updateProduct(product, [this.image01, this.image02, this.image03]);
      this.productSub = this.productService.getProductUpdateListener()
      .subscribe((recievedProduct: Product) => {
        console.log(recievedProduct);
        this.product = recievedProduct;
        this.clearImages();
      });
      console.log('Product updated successfully!');
      this.editmode = false;
    }
  }

  // remove product
  removeProduct(productId: string) {
    this.productService.removeProduct(productId);
  }


  // calculate payment for product
  calcPayment(price: number, quantity: number) {
    this.totalAmount = (price * quantity) + this.delService.delivery_rate;
    this.payAmount = this.totalAmount / 10;
  }


  // clear image cache
  clearImages() {
    this.image01Url = './assets/images/merchant/nopic.png';
    this.image02Url = './assets/images/merchant/nopic.png';
    this.image03Url = './assets/images/merchant/nopic.png';
    this.image01 = null;
    this.image02 = null;
    this.image03 = null;
  }


  // to be modified later (optional function)
  showBprofile() {
   // this.router.navigate(['/sp/bprofile']);
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

  // get delivery service name from it's id
  getDeliveryService(delServiceId: string): DeliveryService {
    let delS: DeliveryService;
    this.deliveryServices.find((del) => {
      if (del.delivery_service === delServiceId) {
        delS = del;
      }
    });
    return delS;
  }

}
