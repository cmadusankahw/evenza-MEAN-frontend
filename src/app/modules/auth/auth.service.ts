import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Merchant, EventPlanner, User, MerchantTemp, LogIn } from './auth.model';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {
  private merchantUpdated = new Subject<Merchant>();
  private eventPlannerUpdated = new Subject<EventPlanner>();
  private userUpdated = new Subject<User[]>();
  private lastIdUpdated = new Subject<string>();

  // to get merchant/event planner once logged in
  private merchant: Merchant;
  private eventPlanner: EventPlanner;

  private users: User [] = [];

  // for merchant data passing
  private merchantTemp: MerchantTemp ;

  //

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

  private userTypeListener = new Subject<string>();

  private isAuthenticated = false;

  // signed user id
  private userId: string;

  // signed user type
  private signedUserType: string;

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

  // get merchant after login
  getMerchant() {
    setTimeout( () => {
    this.http.get<{message: string, merchant: Merchant}>(this.url + 'auth/get/merchant/' + this.userId)
    .subscribe((recievedMerchant) => {
      this.merchant = recievedMerchant.merchant;
      this.merchantUpdated.next(this.merchant);
    });
   }, 500);
  }

  // get event planner after login
  getEventPlanner() {
    setTimeout( () => {
    this.http.get<{message: string, eventPlanner: EventPlanner}>(this.url + 'auth/get/planner/' + this.userId)
      .subscribe((recievedMerchant) => {
        this.eventPlanner = recievedMerchant.eventPlanner;
        this.eventPlannerUpdated.next(this.eventPlanner);
    });
  }, 500);
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

  getSignedUserType(){
    return this.signedUserType;
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

  getUserTypeListener() {
    return this.userTypeListener.asObservable();
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
    this.http.post<{ message: string,
                     token: any,
                     expiersIn: number,
                     user_type: string,
                     user_id: string }>(this.url + 'auth/signin', login)
    .subscribe((recievedData) => {
      console.log(recievedData.message);

      this.setAuthTimer(recievedData.expiersIn);

      this.token = recievedData.token;

      if (recievedData.token) {
        this.isAuthenticated = true;
        this.userId = recievedData.user_id;
        this.signedUserType = recievedData.user_type;
        this.authStatusListener.next(true);
        this.userTypeListener.next(this.signedUserType);
        const now = new Date();
        const expirationDate = new Date (now.getTime() + recievedData.expiersIn * 1000 );
        this.saveAuthData(recievedData.token, expirationDate, recievedData.user_id, recievedData.user_type );

        alert('Login Successfull!');
        if (recievedData.user_type === 'serviceProvider') {
          this.router.navigate(['/sp/dash']);
        }
        if (recievedData.user_type === 'seller') {
          this.router.navigate(['/sel/dash']);
        }
        if (recievedData.user_type === 'eventPlanner') {
          this.router.navigate(['/']);
        }
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
      this.userId = authInformation.userId;
      this.signedUserType = authInformation.userType;
      this.userTypeListener.next(this.signedUserType);
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
   }, duration * 1000);
 }

 // store token and user data in local storage
 private saveAuthData(token: string, expiarationDate: Date, userId: string, userType: string) {
   localStorage.setItem('token', token);
   localStorage.setItem('expiration', expiarationDate.toISOString());
   localStorage.setItem('user_id', userId);
   localStorage.setItem('user_type', userType);
 }

 // clear locally sotred auth data in timeout or sign out
 private clearAuthData() {
   localStorage.removeItem('token');
   localStorage.removeItem('expiration');
   localStorage.removeItem('user_id');
   localStorage.removeItem('user_type');
 }

 // access locally stored auth data
 private getAuthData() {
   const token = localStorage.getItem('token');
   const expiration = localStorage.getItem('expiration');
   const userId = localStorage.getItem('user_id');
   const userType = localStorage.getItem('user_type');
   if (!token || !expiration) {
     return;
   }
   return {
     token,
     expiarationDate : new Date(expiration),
     userId,
     userType
   };
 }

}
