

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
