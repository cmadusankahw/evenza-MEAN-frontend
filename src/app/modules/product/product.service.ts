import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { Product, ProductCategories, QuantityTypes, ProductQuery, DeliveryService, Order } from './product.model';
import { SuccessComponent } from 'src/app/success/success.component';


@Injectable({ providedIn: 'root' })
export class ProductService  {

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


  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private router: Router) { }


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

  // create an order
  createOrder(order: Order) {
    this.http.post<{ message: string, orderId: string }>(this.url + 'product/order/add', order)
    .subscribe((recievedData) => {
      console.log(recievedData.message);
      this.router.navigate(['/print/order/' + recievedData.orderId]);
      this.dialog.open(SuccessComponent, {data: {message: 'Order Successfull! Your Order Id: ' + recievedData.orderId}});
  });
  }


}
