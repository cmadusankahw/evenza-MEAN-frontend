import { Product, ProductCard, ProductCategories, QuantityTypes, PaymentTypes } from './product.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private productUpdated = new Subject<Product>();
  private productsUpdated = new Subject<Product[]>();
  private productCardUpdated = new Subject<ProductCard[]>();

  private quantitiesUpdated = new Subject<QuantityTypes[]>();
  private paymentTypesupdated = new Subject<PaymentTypes[]>();
  private categoriesUpdated = new Subject<ProductCategories[]>();

  // to add products
  private products: Product[] = [];

  // to generate list of product cards
  private productCards: ProductCard[] = [];

  // to generate quanitties list
  private quantities: QuantityTypes[] = [];

  // to generate quanitties list
  private categories: ProductCategories[] = [];

  // to generate quanitties list
  private paymentTypes: PaymentTypes[] = [];

  // is product owner
  private isOwner = true;

  // api url (to be centralized)
  url = 'http://localhost:3000/api/';

  // to render selected product
  private product: Product;


  constructor(private http: HttpClient) { }


  // get methods

  // get the selected products
  getProduct(productId: string) {
    this.http.get<{ message: string, product: Product }>(this.url + 'product/get/' + productId)
      .subscribe((recievedProduct) => {
        console.log(recievedProduct.message);
        console.log(recievedProduct.product);
        this.product = recievedProduct.product;
        this.productUpdated.next(this.product);
      });
  }

  // get list of available product cards
  getProductCard() {
    this.http.get<{ message: string, productCards: ProductCard[] }>(this.url + 'product/list')
      .subscribe((productList) => {
        this.productCards = productList.productCards;
        this.productCardUpdated.next([...this.productCards]);
      });
  }

  // get owner details
  getOwner(): boolean {
    return this.isOwner;
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

   // get payment types list
   getPaymentTypes() {
    this.http.get<{ message: string, paymentTypes: PaymentTypes[] }>(this.url + 'product/pt')
    .subscribe((paymentTypeList) => {
      this.paymentTypes = paymentTypeList.paymentTypes;
      this.paymentTypesupdated.next([...this.paymentTypes]);
    });
  }



  // listners for subjects
  getProductUpdateListener() {
    return this.productUpdated.asObservable();
  }

  getProductsUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  getProductCardUpdateListener() {
    return this.productCardUpdated.asObservable();
  }

  getQuantitiesUpdateListener() {
    return this.quantitiesUpdated.asObservable();
  }

  getCategoriesUpdateListener() {
    return this.categoriesUpdated.asObservable();
  }

  getPaymentTypesUpdateListener() {
    return this.paymentTypesupdated.asObservable();
  }



  // crud methods
  addProduct(product: Product) {
    this.http.post<{ message: string, product_id: string }>(this.url + 'product/get', product)
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        this.products.push(product);
        this.productsUpdated.next([...this.products]);
      });
  }

  updateProduct(product: Product, productId) {
    this.http.put<{ message: string }>(this.url + 'product/get/:' + productId, product)
    .subscribe((recievedData) => {
      console.log(recievedData.message);
      return product;
    });
  }

  removeProduct(productId: string) {
    this.http.delete<{ message: string }>(this.url + 'product/get/:' + productId)
      .subscribe((recievedData) => {
        console.log(recievedData.message);
      });
  }

}
