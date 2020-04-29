

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
  delivery_service: string;
  price: number;
  payment_type: string;
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

export interface PaymentTypes {
  id: string;
  val: string;
}

export interface ProductCard {
  product_id: string;
  product: string;
  description: string;
  product_category: string;
  no_of_orders: number;
  price: number;
  rating: number;
  image_01: string;
}


export interface Businesses {
  id: string;
  val: string;
}
