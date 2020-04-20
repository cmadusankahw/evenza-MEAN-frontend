import { Merchant, EventPlanner, LogIn, MerchantTemp } from './auth.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  private merchantUpdated = new Subject<Merchant[]>();
  private merchantTempUpdated = new Subject<MerchantTemp[]>();
  private eventPlannerUpdated = new Subject<EventPlanner[]>();

  private merchant: Merchant [] = [];

  private eventplanner: EventPlanner [] = [];

  private login: LogIn [] = [];

  //for merchant data passing
  private merchantTemp: MerchantTemp [] = [];

  private isMerchant = true;

  //get methods
  getMerchant() {
    return [...this.merchant];
  }

  getEventPlanner() {
    return [...this.eventplanner];
  }

  getMerchantTemp() {
    return [...this.merchantTemp];
  }

  getLogIn() {
    return [...this.login];
  }

  getUserType() {
    return this.isMerchant;
  }

  getLastMerchantId() {
    if (this.merchant.length > 1) {
      return this.merchant[this.merchant.length - 1].merchant_id;
    } else if (this.merchant.length === 1) {
      return this.merchant[0].merchant_id;
    } else {
      return 'M0';
    }
  }

  getLastEventPlannerId() {
    if (this.eventplanner.length > 1) {
      return this.eventplanner[this.eventplanner.length - 1].user_id;
    } else if (this.eventplanner.length === 1) {
      return this.eventplanner[0].user_id;
    } else {
      return 'U0';
    }
  }

  //listners for subjects
  getMerchantUpdateListener(){
    return this.merchantUpdated.asObservable();
  }

  getEventPlannerUpdateListener(){
    return this.eventPlannerUpdated.asObservable();
  }

  getMerchantTempUpdateListener(){
    return this.merchantTempUpdated.asObservable();
  }

  //set methods
  addMerchant(merchant: Merchant) {
    const newMerchant = {
      merchant_id: merchant.merchant_id,
      merchant_type: merchant.merchant_id,
      first_name: merchant.merchant_id,
      last_name: merchant.merchant_id,
      nic: merchant.merchant_id,
      profile_pic: merchant.profile_pic,
      email: merchant.merchant_id,
      password: merchant.merchant_id,
      contact_no: merchant.contact_no,
      address_line1: merchant.address_line1,
      address_line2: merchant.address_line2,
      postal_code: merchant.postal_code,
      gender: merchant.gender,
      date_of_birth: merchant.date_of_birth,
      isverified: merchant.isverified,
      reg_date: merchant.reg_date
    };

    this.merchant.push(newMerchant);
    this.merchantUpdated.next([...this.merchant]);
  }

  addEventPlanner(eventplanner: EventPlanner) {
    const newEventPlanner = {
      user_id: eventplanner.user_id,
      first_name: eventplanner.first_name,
      last_name: eventplanner.last_name,
      profile_pic:eventplanner.profile_pic,
      email: eventplanner.email,
      password: eventplanner.password,
      contact_no: eventplanner.contact_no,
      address_line1: eventplanner.address_line1,
      address_line2: eventplanner.address_line2,
      postal_code: eventplanner.postal_code,
      gender: eventplanner.gender,
      date_of_birth: eventplanner.date_of_birth,
      reg_date: eventplanner.reg_date
    };

    this.eventplanner.push(newEventPlanner);
    this.eventPlannerUpdated.next([...this.eventplanner]);
  }

  addMerchantTemp(merchantTemp: MerchantTemp) {
    const newMerchantTemp = {
      merchant_id: merchantTemp.merchant_id,
      first_name: merchantTemp.first_name,
      last_name: merchantTemp.last_name,
      email: merchantTemp.email,
      password: merchantTemp.password,
      contact_no: merchantTemp.contact_no,
    };

    this.merchantTemp.push(newMerchantTemp);
  }

  setUserType(userType: boolean) {
    this.isMerchant = userType;
  }

}
