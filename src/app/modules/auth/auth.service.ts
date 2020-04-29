import { Merchant, EventPlanner, User, MerchantTemp, LogIn } from './auth.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AuthService {
  private merchantUpdated = new Subject<Merchant[]>();
  private merchantTempUpdated = new Subject<MerchantTemp[]>();
  private eventPlannerUpdated = new Subject<EventPlanner[]>();
  private userUpdated = new Subject<User[]>();

  private merchant: Merchant [] = [];
  private eventplanner: EventPlanner [] = [];
  private recivedUser: User [] = [];

  private signedMerchant: Merchant;
  private signedEventPlanner: EventPlanner;
  private login: LogIn;

  // for merchant data passing
  private merchantTemp: MerchantTemp [] = [];

  private isMerchant = true;
  url = 'http://localhost:3000/api';

  // login status
  private loginPassed = false;


  constructor(private http: HttpClient) {}



  // get methods

  getMerchant() {
    this.http.get<{message: string, merchant: Merchant}>(this.url + '/auth/merchant')
    .subscribe((recievedMerhant) => {
      this.signedMerchant = recievedMerhant.merchant;
    });
  }

  getEventPlanner() {
    this.http.get<{message: string, eventPlanner: EventPlanner}>(this.url + '/auth/eventplanner')
    .subscribe((recievedEventplanner) => {
      this.signedEventPlanner = recievedEventplanner.eventPlanner;
    });
  }

  // return merchant Temp array between comps
  getMerchantTemp() {
      return [...this.merchantTemp];
  }

  // get users list to login check
  getUser() {
    this.http.get<{message: string, user: User[]}>(this.url + '/auth/users')
      .subscribe((recievedUsers) => {
        this.recivedUser = recievedUsers.user;
        this.userUpdated.next([...this.recivedUser]);
      });
  }

  // get login state
  getLogin(): boolean {
    return this.loginPassed;
  }



  // logic related methods

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



  // listners for subjects

  getMerchantUpdateListener() {
    return this.merchantUpdated.asObservable();
  }

  getEventPlannerUpdateListener() {
    return this.eventPlannerUpdated.asObservable();
  }

  getMerchantTempUpdateListener() {
    return this.merchantTempUpdated.asObservable();
  }

  getUserUpdateListener() {
    return this.userUpdated.asObservable();
  }



  // set methods

  addMerchant(merchant: Merchant) {

    this.merchant.push(merchant);
    this.merchantUpdated.next([...this.merchant]);
  }

  addEventPlanner(eventplanner: EventPlanner) {

    this.eventplanner.push(eventplanner);
    this.eventPlannerUpdated.next([...this.eventplanner]);
  }

  addMerchantTemp(merchantTemp: MerchantTemp) {

    this.merchantTemp.push(merchantTemp);
  }

  setUserType(userType: boolean) {
    this.isMerchant = userType;
  }

  signIn(login: LogIn) {
    const newLogin = {
      email: login.email,
      password: login.password
    };
    this.http.post<{message: string, loginpassed: boolean}>(this.url + '/auth/login', newLogin)
    .subscribe((recievedLogin) => {
        this.loginPassed =  recievedLogin.loginpassed;
        console.log(recievedLogin.message);
        console.log(this.loginPassed);
    });
  }

}
