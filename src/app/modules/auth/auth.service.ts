import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Merchant, EventPlanner, User, MerchantTemp, LogIn } from './auth.model';
import { Router } from '@angular/router';

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

  // storing token for auth validation
  private token: string;

  // timer to auto logout
  private tokenTimer: any;

  private authStatusListener = new Subject<boolean>();

  private isAuthenticated = false;

  constructor(private http: HttpClient,
              private router: Router, ) {}

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

  // get token to be used by other services
  getToken() {
    return this.token;
  }

  // get authentication status
  getisAuth() {
    return this.isAuthenticated;
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

  getAuhStatusListener() {
    return this.authStatusListener.asObservable();
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
    this.http.post<{ message: string, token: any, expiersIn: number }>(this.url + 'auth/signin', login)
    .subscribe((recievedData) => {
      console.log(recievedData.message);

      this.setAuthTimer(recievedData.expiersIn);

      this.token = recievedData.token;

      if (recievedData.token) {
        this.isAuthenticated = true;
        this.authStatusListener.next(true);

        const now = new Date();
        const expirationDate = new Date (now.getTime() + recievedData.expiersIn * 1000 );
        this.saveAuthData(recievedData.token, expirationDate );

        alert('Login Successfull!');
        this.router.navigate(['/sp/dash']);
      }
   });
 }

   // auto auth user after restart
   autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiersIn = authInformation.expiarationDate.getTime() - now.getTime();
    if (expiersIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiersIn / 1000); // node timers works in secords (not ms)
      this.authStatusListener.next(true);

    }
  }


 // log out user
 signOut() {
   this.token = null;
   this.isAuthenticated = false;
   this.authStatusListener.next(false);
   this.clearAuthData();
   clearTimeout(this.tokenTimer);
 }

 // starts the session timer
 private setAuthTimer(duration: number) {
   console.log ('Setting timer to : ' + duration);
   this.tokenTimer = setTimeout(() => {
    this.signOut();
    alert('Session Time Out! You have been logged out! Please log in back..');
    this.router.navigate(['/']);
   }, duration* 1000);
 }

 // store token and user data in local storage
 private saveAuthData(token: string, expiarationDate: Date) {
   localStorage.setItem('token', token);
   localStorage.setItem('expiration', expiarationDate.toISOString());
 }

 // clear locally sotred auth data in timeout or sign out
 private clearAuthData() {
   localStorage.removeItem('token');
   localStorage.removeItem('expiration');
 }

 // access locally stored auth data
 private getAuthData() {
   const token = localStorage.getItem('token');
   const expiration = localStorage.getItem('expiration');
   if (!token || !expiration) {
     return;
   }
   return {
     token,
     expiarationDate : new Date(expiration)
   };
 }

}
