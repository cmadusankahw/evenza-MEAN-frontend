export interface Service {
  service_id: string;
  service_name: string;
  business_id: string;
  business_name: string;
  description: string;
  service_category: string;
  available_booking: boolean;
  available_appoints: boolean;
  open_days_as_business: boolean;
  rating: number;
  no_of_ratings: number;
  no_of_bookings: number;
  no_of_appoints: number;
  rate: number;
  rate_type: string;
  payment_type: string;
  feature_img: string;
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

export interface PaymentTypes {
  id: string;
  val: string;
}

export interface BusinessLocations {
  id: string;
  val: string;
}

export interface ServiceCard {
  service_id: string;
  business_id: string;
  service_name: string;
  description: string;
  service_category: string;
  no_of_bookings: number;
  no_of_appoints: number;
  rating: number;
  rate: number;
  rate_type: string;
  feature_img: string;
}
