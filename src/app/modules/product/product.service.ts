import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Product, ProductCategories, QuantityTypes } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductService  {

  private productUpdated = new Subject<Product>();
  private productsUpdated = new Subject<Product[]>();
  private lastIdUpdated = new Subject<string>();
  private quantitiesUpdated = new Subject<QuantityTypes[]>();
  private categoriesUpdated = new Subject<ProductCategories[]>();

  // to add products
  private products: Product[] = [];

  // to generate quanitties list
  private quantities: QuantityTypes[] = [];

  // to generate quanitties list
  private categories: ProductCategories[] = [];

  // api url (to be centralized)
  url = 'http://localhost:3000/api/';

  // to render selected product
  private product: Product;

  // to get the very last id of the product list
  private lastId: string;

  constructor(private http: HttpClient) { }


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
    this.http.get<{ message: string, quantities: QuantityTypes[] }>(this.url + 'product/qt')
    .subscribe((quantityList) => {
      this.quantities = quantityList.quantities;
      this.quantitiesUpdated.next([...this.quantities]);
    });
  }


  // get last product id
  getLastProductId() {
    this.http.get<{ lastid: string }>(this.url + 'product/last')
    .subscribe((recievedId) => {
      console.log(recievedId.lastid);
      this.lastId = recievedId.lastid;
      this.lastIdUpdated.next(this.lastId);
    });
  }



  // listners for subjects
  getProductUpdateListener() {
    return this.productUpdated.asObservable();
  }

  getProductsUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  getQuantitiesUpdateListener() {
    return this.quantitiesUpdated.asObservable();
  }

  getCategoriesUpdateListener() {
    return this.categoriesUpdated.asObservable();
  }

  getLastIdUpdateListener(){
    return this.lastIdUpdated.asObservable();
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
    this.http.post<{image_01: string, image_02: string, image_03: string}>(this.url + 'product/add/img', productData )
      .subscribe ((recievedImages) => {
        console.log(recievedImages);
        if (recievedImages.image_01 !== null) {
          product.image_01 = recievedImages.image_01;
        }
        if (recievedImages.image_02 !== null) {
          product.image_02 = recievedImages.image_02;
        }
        if (recievedImages.image_03 !== null) {
          product.image_03 = recievedImages.image_03;
        }
        this.http.post<{ message: string, result: Product }>(this.url + 'product/add', product)
        .subscribe((recievedData) => {
          console.log(recievedData.message);
          console.log(recievedData.result);
          this.products.push(product);
          this.productsUpdated.next([...this.products]);
          this.getLastProductId();
      });
    });
  }

  // update product
  updateProduct(product: Product, images: File[]) {
    const productData = new FormData();
    for (const image of images) {
      if (image) {
        productData.append('images[]', image, image.name);
      }
    }
    console.log(productData);
    this.http.post<{image_01: string, image_02: string, image_03: string}>(this.url + 'product/add/img', productData )
      .subscribe ((recievedImages) => {
      console.log(recievedImages);
      if (recievedImages.image_01 !== null) {
        product.image_01 = recievedImages.image_01;
      }
      if (recievedImages.image_02 !== null) {
        product.image_02 = recievedImages.image_02;
      }
      if (recievedImages.image_03!== null) {
        product.image_03 = recievedImages.image_03;
      }
      this.http.post<{ message: string, result: Product }>(this.url + 'product/edit/' + product.product_id, product)
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        console.log(recievedData.result);
        this.product = product;
        this.productUpdated.next(this.product);
    });
  });
  }

  // remove product
  removeProduct(productId: string) {
    console.log(productId);
    this.http.delete<{ message: string }>(this.url + 'product/edit/' + productId)
      .subscribe((recievedData) => {
        const updatedProducts = this.products.filter(prod => prod.product_id !== productId);
        this.products = updatedProducts;
        this.productsUpdated.next([...this.products]);
        console.log(recievedData.message);
        this.getLastProductId();
      });
  }

  // set current product
  setProduct(product: Product) {
    this.product = product;
    this.productUpdated.next(this.product);
    return true;
  }

}
