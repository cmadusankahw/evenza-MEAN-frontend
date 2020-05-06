import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Merchant, EventPlanner, User, MerchantTemp, LogIn } from './auth.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  private merchantUpdated = new Subject<Merchant[]>();
  private eventPlannerUpdated = new Subject<EventPlanner[]>();
  private userUpdated = new Subject<User[]>();
  private lastIdUpdated = new Subject<string>();

  private merchants: Merchant [] = [];
  private eventPlanners: EventPlanner [] = [];
  private users: User [] = [];

  // for merchant data passing
  private merchantTemp: MerchantTemp ;

  // user type
  private userType = false;

  url = 'http://localhost:3000/api/';

  // last signed user id
  private lastId: string;

  constructor(private http: HttpClient) {}

  // get methods

  // return merchant Temp array between comps
  getMerchantTemp() {
      if (this.merchantTemp) {
        return this.merchantTemp;
      }

  }

  // get users list to login
  getUser() {
    this.http.get<{message: string, users: User[]}>(this.url + 'auth/users')
      .subscribe((recievedUsers) => {
        this.users = recievedUsers.users;
        this.userUpdated.next([...this.users]);
      });
  }

  // get user type in signup-select
  getUserType() {
        return this.userType;
  }

   // get last product id
   getLastUserId() {
     if (this.users.length) {
        this.lastId = this.users[this.users.length - 1].user_id;
        this.lastIdUpdated.next(this.lastId);
     } else {
        this.http.get<{ lastid: string }>(this.url + 'auth/last')
        .subscribe((recievedId) => {
          console.log(recievedId.lastid);
          this.lastId = recievedId.lastid;
          this.lastIdUpdated.next(this.lastId);
        });
     }
  }




  // listners for subjects

  getMerchantUpdateListener() {
    return this.merchantUpdated.asObservable();
  }


  getEventPlannerUpdateListener() {
    return this.eventPlannerUpdated.asObservable();
  }


  getUserUpdateListener() {
    return this.userUpdated.asObservable();
  }

  getLastIdUpdateListener() {
    return this.lastIdUpdated.asObservable();
  }




  // set methods

  // add merchant
  addMerchant(merchant: Merchant, password: string) {
    const user: User = {
      user_id: merchant.user_id,
      user_type: merchant.user_type,
      email: merchant.email,
      password,
      state: false,
    };
    this.http.post<{ message: string, result: User }>(this.url + 'auth/signup/user', user)
    .subscribe((recievedData) => {
      console.log(recievedData.message);
      console.log(recievedData.result);
      this.users.push(user);
      this.userUpdated.next([...this.users]);
      this.http.post<{ message: string }>(this.url + 'auth/signup/merchant', merchant)
        .subscribe((recievedMessage) => {
          console.log(recievedMessage.message);
          this.merchants.push(merchant);
          this.merchantUpdated.next([...this.merchants]);
          this.getLastUserId();
          alert('Successfully Signed Up!');
            });
   });
  }

  // add event planner
  addEventPlanner(eventPlanner: EventPlanner, password: string) {
    const user: User = {
      user_id: eventPlanner.user_id,
      user_type: 'eventPlanner',
      email: eventPlanner.email,
      password,
      state: false,
    };
    this.http.post<{ message: string, result: User }>(this.url + 'auth/signup/user', user)
    .subscribe((recievedData) => {
      console.log(recievedData.message);
      console.log(recievedData.result);
      this.users.push(user);
      this.userUpdated.next([...this.users]);
      this.http.post<{ message: string }>(this.url + 'auth/signup/planner', eventPlanner)
        .subscribe((recievedMessage) => {
          console.log(recievedMessage.message);
          this.eventPlanners.push(eventPlanner);
          this.eventPlannerUpdated.next([...this.eventPlanners]);
          this.getLastUserId();
          alert('Successfully Signed Up!');
            });
   });
  }

 // add a new Merchant Temp
  addMerchantTemp(merchantTemp: MerchantTemp) {
    this.merchantTemp = merchantTemp;
  }

  // set user type
  setUserType(userType: boolean) {
    this.userType = userType;
    console.log(this.userType);
  }


  // log in user
  signIn(login: LogIn) {
    this.http.post<{ message: string, token: any }>(this.url + 'auth/signin', login)
    .subscribe((recievedData) => {
      console.log(recievedData.message);
      console.log(recievedData.token);
   });
 }
}
