export interface Service {
  service_id: string;
  service_name: string;
  business_name: string;
  description: string;
  service_category: string;
  available_booking: boolean;
  available_appoints: boolean;
  rating: number;
  no_of_ratings: number;
  no_of_bookings: number;
  no_of_appoints: number;
  created_date: string;
  created_time: string;
  rate: number;
  rate_type: string;
  pay_on_meet: boolean;
  image_01: string;
  image_02: string;
  image_03: string;
}

export interface ServiceCategories {
  id: string;
  val: string;
}

export interface ServiceRates {
  id: string;
  val: string;
}

export interface ServiceQuery {
  category: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  payOnMeet: boolean;
  userRating: number;
}
