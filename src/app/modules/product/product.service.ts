import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog , MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';

import { Product, ProductCategories, QuantityTypes, ProductQuery, DeliveryService, Order, Promotion } from './product.model';
import { SuccessComponent } from 'src/app/success/success.component';


@Injectable({ providedIn: 'root' })
export class ProductService  {


    // socket connection
  private socket = io('http://localhost:3000');


  private productUpdated = new Subject<Product>();
  private sellerProductsUpdated = new Subject<Product[]>();
  private searchedProductUpdated = new Subject<Product[]>();
  private productsUpdated = new Subject<Product[]>();
  private categoriesUpdated = new Subject<ProductCategories[]>();
  private deliveryServicesUpdated = new Subject<DeliveryService[]>();

  // to add products
  private products: Product[] = [];

   // to add searched products
   private seachedProducts: Product[] = [];

  // list of seller products
  private sellerProducts: Product[] = [];

  // to generate quanitties list
  private quantities: QuantityTypes[] =  [
    {id: '1', val: 'Units'},
    {id: '2', val: 'Kg'},
    {id: '3', val: 'Ltr'},
    {id: '4', val: 'm'},
   ];

  // to generate quanitties list
  private categories: ProductCategories[] = [];

  // to get delivery services list
  private deliveryServices: DeliveryService[] = [];

  // to render selected product
  private product: Product;

  // api url (to be centralized)
  url = 'http://localhost:3000/api/';


    // snack bars for notification display
  private horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';



  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private router: Router,
              private _snackBar: MatSnackBar) { }


  // get methods

  // get current produt
 getProduct() {
    this.productUpdated.next(this.product);
 }

  // get list of available product cards
  getProducts() {
    this.http.get<{ message: string, products: Product[] }>(this.url + 'product/get')
      .subscribe((productList) => {
        this.products = productList.products;
        this.productsUpdated.next([...this.products]);
      });
  }

  // get list of sellers only prodcts
  getSellerProducts() {
    this.http.get<{ message: string, products: Product[] }>(this.url + 'product/get/seller')
      .subscribe((productList) => {
        this.sellerProducts = productList.products;
        this.sellerProductsUpdated.next([...this.sellerProducts]);
      });
  }

  // get categories list
  getCategories() {
    this.http.get<{ message: string, categories: ProductCategories[] }>(this.url + 'product/cat')
    .subscribe((categoriesList) => {
     this.categories = categoriesList.categories;
     this.categoriesUpdated.next([...this.categories]);
    });
  }

   // get quantities list
   getQuantities() {
     return this.quantities;
  }

   // get delivery services
   getDeliveryServices() {
    this.http.get<{ message: string, deliveryServices: DeliveryService[] }>(this.url + 'product/delivery')
    .subscribe((deliveryServiceList) => {
      this.deliveryServices = deliveryServiceList.deliveryServices;
      this.deliveryServicesUpdated.next([...this.deliveryServices]);
    });
  }

  // listners for subjects
  getProductUpdateListener() {
    return this.productUpdated.asObservable();
  }

  getSellerProductUpdateListener() {
    return this.sellerProductsUpdated.asObservable();
  }

  getdeliveryServicesUpdateListener() {
    return this.deliveryServicesUpdated.asObservable();
  }


  getSearchedProductUpdatedListener() {
    return this.searchedProductUpdated.asObservable();
  }

  getProductsUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  getCategoriesUpdateListener() {
    return this.categoriesUpdated.asObservable();
  }


  // crud methods

  // add new product
  addProduct(product: Product, images: File[]) {
    const productData = new FormData();
    for (const image of images) {
      if (image) {
        productData.append('images[]', image, image.name);
      }
    }
    console.log(productData);
    this.http.post<{imagePaths: string[]}>(this.url + 'product/add/img', productData )
        .subscribe ((recievedImages) => {
        console.log(recievedImages);
        if (recievedImages.imagePaths[0]) {
          product.image_01 = recievedImages.imagePaths[0];
        }
        if (recievedImages.imagePaths[1]) {
          product.image_02 = recievedImages.imagePaths[1];
        }
        if (recievedImages.imagePaths[2]) {
          product.image_03 = recievedImages.imagePaths[2];
        }
        this.http.post<{ message: string, result: Product }>(this.url + 'product/add', product)
        .subscribe((recievedData) => {
          console.log(recievedData.message);
          console.log(recievedData.result);
          this.getSellerProducts();
          this.dialog.open(SuccessComponent, {data: {message: 'Product Added Successfully!'}});
      });
    });
  }

  // update product
  updateProduct(product: Product, images: File[]) {
    const productData = new FormData();
    const currentImg = [];
    let j = 0;
    for (const image of images) {
      if (image) {
        productData.append('images[]', image, image.name);
        currentImg.push(j);
      }
      j++;
    }
    console.log(productData);
    this.http.post<{imagePaths: string[]}>(this.url + 'product/add/img', productData )
      .subscribe ((recievedImages) => {
      console.log(recievedImages);
      recievedImages.imagePaths.find((img) => {
        if ( currentImg.includes(2) ) {
          product.image_03 = img;
          currentImg.pop();
        } else if ( currentImg.includes(1)) {
            product.image_02 = img;
            currentImg.pop();
        } else if ( currentImg.includes(0)) {
            product.image_01 = img;
            currentImg.pop();
        }
      });
      this.http.post<{ message: string, result: Product }>(this.url + 'product/edit', product)
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        console.log(recievedData.result);
        this.product = product;
        this.productUpdated.next(this.product);
        this.getSellerProducts();
        this.dialog.open(SuccessComponent, {data: {message: 'Product Updated Successfully!'}});
    });
  });
  }

  // update product
  updateOnlyProduct(product: Product) {
    this.http.post<{ message: string, result: Product }>(this.url + 'product/edit', product)
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        console.log(recievedData.result);
        this.product = product;
        this.productUpdated.next(this.product);
        this.getSellerProducts();
        this.dialog.open(SuccessComponent, {data: {message: 'Product Updated Successfully!'}});
    });

  }

  // remove product
  removeProduct(productId: string) {
    console.log(productId);
    this.http.delete<{ message: string }>(this.url + 'product/edit/' + productId)
      .subscribe((recievedData) => {
        const updatedProducts = this.sellerProducts.filter(prod => prod.product_id !== productId);
        this.sellerProducts = updatedProducts;
        this.sellerProductsUpdated.next([...this.sellerProducts]);
        console.log(recievedData.message);
        this.dialog.open(SuccessComponent,
          {data: {message: 'Product has Removed!'}});
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/sel/dash/bprofile']);
        this._snackBar.open('Product :' + productId + ' removed!', 'Dismiss', {
          duration: 2500,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          });
      });
  }


    // add new category by admin
    addCategory(category: string) {
      this.http.post<{ message: string }>(this.url + 'product/cat/add',  { val: category})
      .subscribe((res) => {
          this.dialog.open(SuccessComponent,
          {data: {message: 'New Product Category has Created!'}});
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/admin/categories']);
          this._snackBar.open('New product Category Added!', 'Dismiss', {
            duration: 2500,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            });
      });
    }

    // remove a category by admin
    removeCategory(cat: string) {
      this.http.post<{ message: string }>(this.url + 'product/cat/remove',  cat)
      .subscribe((res) => {
          this.dialog.open(SuccessComponent,
          {data: {message: 'Product Category deleted!'}});
          const updatedCategories = this.categories.filter(catr => catr.val !== cat);
          this.categories = updatedCategories;
          this.categoriesUpdated.next([...this.categories]);
          this._snackBar.open('Category has removed!', 'Dismiss', {
            duration: 2500,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            });
      });
    }

  // set current product
  setProduct(product: Product) {
    this.product = product;
    this.productUpdated.next(this.product);
    return true;
  }

  // search products
  searchProducts(searchQuery: ProductQuery) {
    this.http.post<{ message: string, products: Product[] }>(this.url + 'product/search', searchQuery)
    .subscribe((productList) => {
      this.seachedProducts = productList.products;
      this.searchedProductUpdated.next([...this.seachedProducts]);
      console.log(productList.message);
    });
  }


  // rating a product
  rateProduct(id: string, rate: number, review: string) {
    this.http.post<{ message: string }>(this.url + 'product/rating/add', {id,  rate, review})
    .subscribe((recievedData) => {
      console.log(recievedData.message);
      this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
  });
  }

  // add promotion
  addPromotion(promotion: Promotion, productId: string ) {
    this.http.post<{ message: string }>(this.url + 'product/promotion/add', {promotion, productId})
    .subscribe((recievedData) => {
      console.log(recievedData.message);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/sel/dash/bprofile']);
      this.dialog.open(SuccessComponent, {data: {message: recievedData.message}});
  });
  }

  // create an order
  createOrder(order: Order) {
    this.http.post<{ message: string, orderId: string }>(this.url + 'product/order/add', order)
    .subscribe((recievedData) => {
      console.log(recievedData.message);
      this.router.navigate(['/print/order/' + recievedData.orderId]);
      this.sendOrder(order.product, order.quantity.toString());
      this.dialog.open(SuccessComponent, {data: {message: 'Order Successfull! Your Order Id: ' + recievedData.orderId}});
  });
  }


  // create new event related booking
  createEventOrder(order: Order) {

    this.http.post<{ message: string, orderId: string }>(this.url + 'product/order/add', order)
    .subscribe((recievedData) => {
               console.log(recievedData.message);
               this.http.post<{ message: string }>(this.url + 'product/order/event', {
                event_id: order.event_id,
                product_id: order.product_id,
                product: order.product,
                product_category: order.product_category,
                order_id: recievedData.orderId,
                allocated_budget: order.amount,
                spent_budget: order.amount,
                ordered_date: order.created_date,
               })
               .subscribe((recievedMsg) => {
                 console.log(recievedMsg.message);
                 this.router.navigate(['/print/order/' + recievedData.orderId]);
                 this.sendOrder(order.product, order.quantity.toString());
                 this.dialog.open(SuccessComponent, {data: {message: 'Order Successfull! Your Order Id: ' + recievedData.orderId}});
                });
            });
   }


   // socket.io based realtime order notifications

  // trigger booking created event realtime for interested listeners
  newOrderCreated(){
    let observable = new Observable<{product: string, quantity: string }>(observer => {
        this.socket.on('order add', (data) => {
            observer.next(data);
        });
        return () => {this.socket.disconnect(); };
    });
    return observable;
}

// emit socket once a booking is created
sendOrder(product: string, quantity: string) {
      this.socket.emit('order-add', {product, quantity});
}



}
