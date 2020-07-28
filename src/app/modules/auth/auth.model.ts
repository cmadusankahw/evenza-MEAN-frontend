

export interface Merchant {
  user_id: string;
  user_type: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
  nic: string;
  email: string;
  contact_no: string;
  address_line1: string;
  address_line2: string;
  postal_code: string;
  gender: string;
  date_of_birth: string;
  id_verification: IdVerification;
  reg_date: string;
  business: Business;
}

export interface Admin {
  user_id: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
  email: string;
  contact_no: string;
  address_line1: string;
  address_line2: string;
  postal_code: string;
  gender: string;
  card_details: CardDetails;
  payment_details: {
      user_id: string;
      user_type: string;
      pays: {
        timestamp: {year: string, month: string };
        paid_date: string;
        paid_amount: number;
        due_amount: number;
      }[];
  }[];
}



export interface MerchantTemp {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  contact_no: string;
  reg_date: string;
}

export interface EventPlanner {
  user_id: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
  email: string;
  contact_no: string;
  address_line1: string;
  address_line2: string;
  postal_code: string;
  gender: string;
  date_of_birth: string;
  reg_date: string;
}

export interface User {
  user_id: string;
  user_type: string;
  email: string;
  password: string;
  state: boolean;
}

export interface LogIn {
  email: string;
  password: string;
}

export interface Business {
  title: string;
  description: string;
  email: string;
  contact_no: string;
  address_line1: string;
  address_line2: string;
  postal_code: string;
  created_date: string;
  location: BusinessLocation;
  business_verification: BusinessVerification;
  open_days: OpenDays[];
  payment_verified: boolean;
  card_details: CardDetails;
  feature_img: string;
  logo: string;
}

export interface OpenDays {
  day: number;
  isopened: boolean;
  from_time: number;
  to_time: number;
}

export interface BusinessLocation {
  lat: number;
  lang: number;
  homeTown: string;
}

export interface BusinessVerification {
  business_isverified: boolean;
  br_side_a: string;
  br_side_b: string;
}

export interface IdVerification {
  isverified: boolean;
  id_sideA: string;
  id_sideB: string;
  issuer: string;
}

export interface BusinessVerifications {
  user_id: string;
  business_isverified: boolean;
  br_side_a: string;
  br_side_b: string;
}

export interface IdVerifications {
  user_id: string;
  isverified: boolean;
  id_sideA: string;
  id_sideB: string;
  issuer: string;
}

export interface CardDetails {
  name_on_card: string;
  card_no: string;
  cvc_no: string;
  bank: string;
  branch: string;
  exp_month: string;
  exp_year: string;
}
