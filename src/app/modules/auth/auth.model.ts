export interface Merchant {
  merchant_id: string;
  merchant_type: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
  nic: string;
  email: string;
  password: string;
  contact_no: string;
  address_line1: string;
  address_line2: string;
  postal_code: string;
  gender: string;
  date_of_birth: string;
  isverified: boolean;
  reg_date: string;
}

export interface MerchantTemp {
  merchant_id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  contact_no: string;
}

export interface Gender {
  id: string;
  val: string;
}

export interface EventPlanner {
  user_id: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
  email: string;
  password: string;
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
  fisrt_name: string;
  last_name: string;
  isverified: boolean;
  state: string;
}

export interface LogIn {
  email: string;
  password: string;
}
