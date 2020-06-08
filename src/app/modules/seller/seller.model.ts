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
  business_id: string;
  merchant_id: string;
  pending_orders: number;
  last_order_date: string;
  to_delivery_orders: number;
  next_delivery_date: string;
  completed_orders: number;
  last_completed_date: string;
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
  transaction_id: string;
  order_id: string;
  product: string;
  quantity: number;
  qty_type: string;
  cust_name: string;
  earned_date: string;
  earned_time: string;
  comments: string;
  payment_type: string;
  commission_due: number;
  net_earning: number;
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





