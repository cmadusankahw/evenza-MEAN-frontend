import { DeliveryService } from '../product/product.model';
import { Business } from '../auth/auth.model';

export interface BusinessVerify {
  isverified: string;
  br_sideA_image: object;
  br_sideB_image: object;
  certify_name: string;
  issued_org: string;
  certify_image: object;
}

export interface BusinessStat {
  business_id: string;
  earnings: string;
  performance_value: number;
  onselling_products: number;
  fb_link: string;
  insta_link: string;
  twitter_link: string;
}

export interface DashStat {
  pending_orders: number;
  last_order_date: string;
  delivered_orders: number;
  last_delivery_date: string;
  cancelled_orders: number;
  last_cancelled_date: string;
  inventory: number;
  lasT_modified_date: string;
}

export interface PayStat {
  business_id: string;
  pay_amount: number;
  pay_due_date: string;
  overdue: boolean;
  last_payment: number;
  last_pay_date: string;
}


export interface Earnings {
  order_id: string;
  product_id: string;
  product: string;
  earned_date: string;
  earned_time: string;
  payment_type: string;
  commission_due: number;
  amount_paid: number;
  amount: number;
}

export interface IDVerify  {
  isverified: string;
  id_type: string;
  sideA_image: object;
  sideB_image: object;
}

export interface ProductInventory {
  product_id: string;
  product: string;
  product_category: string;
  qty_type: string;
  availability: boolean;
  inventory: number;
  delivery_service: string;
  price: number;
}

export interface ProductCategories {
  id: string;
  val: string;
}

export interface Order {
  order_id: string;
  product_id: string; // fk
  product: string; // retrived from product
  qty_type: string; // retrived from produc
  product_category: string;
  business_name: string; // retrived from product
  delivery_address: string;
  created_date: string;
  state: string;
  review: string;
  quantity: number;
  comment: string;
  amount: number;
  commission_due: number;
  amount_paid: number;
  delivery_service: DeliveryService; // retrived from product.delivery_service
  seller: {seller_id: string, email: string, name: string};
  user: { user_id: string, email: string, name: string};
}



export interface OrderStat {
  order_id: string;
  product_id: string;
  product: string;
  quantity: number;
  qty_type: string;
  product_category: string;
  state: string;
  created_date: string;
  commission_due: number;
  amount_paid: number;
  amount: number;
}


// frontend report data models

export interface ProductOrderRequest {
  from_date: Date;
  to_date: Date;
  order_type: string;
  product_id: string;
  rating: number;
  amount: number;
  sort: string;
  group: string;
}


export interface PaymentHistoryRequest {
  from_date: Date;
  to_date: Date;
  product_id: string;
  payment: number;
  earning: number;
  due: number;
  sort: string;
  group: string;
}

export interface ProductDetailsRequest {
  product_id: string;
  earning: number;
  rating: number;
  sort: string;
  group: string;
}

export interface RateReviewRequest {
  product_id: string;
  user_id: string;
  rating: number;
  sort: string;
  group: string;
}


export interface OrderReport {
  order_id: string;
  year: number;
  month: number;
  amount: number;
  amount_paid: number;
  commision_due: number;
  created_date: string;
  user: { user_id: string, email: string, name: string };
  seller: { seller_id: string, email: string, name: string };
  qty_type: string;
  delivery_address: string;
  delivery_service: DeliveryService;
  business_name: string;
  product_category: string;
  state: string;
  product: string;
  product_id: string;
  quantity: number;
}
