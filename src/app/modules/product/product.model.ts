

export interface Product {
  product_id: string;
  business_name: string;
  product: string;
  product_category: string;
  qty_type: string;
  description: string;
  created_date: string;
  created_time: string;
  availability: boolean;
  inventory: number;
  rating: number;
  no_of_ratings: number;
  no_of_orders: number;
  delivery_service: string; // fk
  price: number;
  pay_on_delivery: boolean;
  image_01: string;
  image_02: string;
  image_03: string;
}

export interface ProductCategories {
  id: string;
  val: string;
}

export interface QuantityTypes {
  id: string;
  val: string;
}


export interface Businesses {
  id: string;
  val: string;
}

export interface ProductQuery {
  category: string;
  minPrice: number;
  maxPrice: number;
  payOnDelivery: boolean;
  userRating: number;
}

export interface DeliveryService {
  delivery_service: string;
  title: string;
  email: string;
  address: string;
  hotline: string;
  delivery_rate: number;
  min_delivery_time: number;
  max_delivery_time: number;
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
  // seller
  // user
}
