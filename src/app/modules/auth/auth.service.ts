import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Merchant, EventPlanner, User, MerchantTemp, LogIn } from './auth.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SuccessComponent } from 'src/app/success/success.component';

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

  // user type between signup pages
  private userType = false;

  url = 'http://localhost:3000/api/';

  // last signed user id
  private lastId: string;

  // storing token for auth validation
  private token: string;

  // timer to auto logout
  private tokenTimer: any;

  // login details listener
  private authStatusListener = new Subject<boolean>();

  // details for app header
  private headerDetailsListener = new Subject<{userType: string, profilePic: string}>();

  private headerDetails: {userType: string, profilePic: string};

  // user login status
  private isAuthenticated = false;



  constructor(private http: HttpClient,
              private router: Router,
              public dialog: MatDialog) {}


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
    this.http.get<{message: string, merchant: Merchant}>(this.url + 'auth/get/merchant')
    .subscribe((recievedMerchant) => {
      this.merchant = recievedMerchant.merchant;
      this.merchantUpdated.next(this.merchant);
    }, (error) => {
      this.router.navigate(['/']);
      console.log(error);
    });
  }

  // get event planner after login
  getEventPlanner() {
    this.http.get<{message: string, eventPlanner: EventPlanner}>(this.url + 'auth/get/planner')
      .subscribe((recievedMerchant) => {
        this.eventPlanner = recievedMerchant.eventPlanner;
        this.eventPlannerUpdated.next(this.eventPlanner);
    }, (error) => {
      this.router.navigate(['/']);
      console.log(error);
    });
  }


  // get details for header
  getHeaderDetails() {
    if (this.token) {
      this.http.get<{user_type: string, profile_pic: string}>(this.url + 'auth/get/header')
      .subscribe((recievedHeader) => {
        this.headerDetails = {
          userType: recievedHeader.user_type,
          profilePic: recievedHeader.profile_pic};
        this.headerDetailsListener.next(this.headerDetails);
    });
    }
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

  getHeaderDetailsListener() {
    return this.headerDetailsListener.asObservable();
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
          this.dialog.open(SuccessComponent, {data: {message: 'Signed up successfully! Welcome to Evenza!'}});
            }, (error) => {
              console.log(error);
            });
   }, (error) => {
     console.log(error);
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
          this.dialog.open(SuccessComponent, {data: {message: 'Signed up successfully! Welcome to Evenza!'}});
            }, (error) => {
              console.log(error);
            });
   }, (error) => {
      console.log(error);
   });
  }

  // update merchant
  updateMerchant(merchant: Merchant, image: File) {
    if (image) {
    const newMerchant = new FormData();
    newMerchant.append('images[]', image, image.name);
    console.log(newMerchant);

    this.http.post<{profile_pic: string}>(this.url + 'auth/merchant/img', newMerchant )
    .subscribe ((recievedImage) => {
    console.log(recievedImage);
    merchant.profile_pic = recievedImage.profile_pic;
    this.http.post<{message: string}>(this.url + 'auth/merchant' , merchant)
    .subscribe((recievedData) => {
      console.log(recievedData.message);
      this.merchant = merchant;
      this.merchantUpdated.next(this.merchant);
      this.dialog.open(SuccessComponent, {data: {message: 'Your Profile Details Updated Successfully!'}});
    }, (error) => {
      console.log(error);
      });
    });
  } else {
    this.http.post<{message: string}>(this.url + 'auth/merchant' , merchant)
    .subscribe((recievedData) => {
      console.log(recievedData.message);
      this.merchant = merchant;
      this.merchantUpdated.next(this.merchant);
      this.dialog.open(SuccessComponent, {data: {message: 'Your Profile Details Updated Successfully!'}});
    }, (error) => {
      console.log(error);
      });
  }
  }


  // update planner
  updateEventPlanner(planner: EventPlanner, image: File) {
    if (image) {
    const newPlanner = new FormData();
    newPlanner.append('images[]', image, image.name);
    console.log(newPlanner);

    this.http.post<{profile_pic: string}>(this.url + 'auth/planner/img', newPlanner )
    .subscribe ((recievedImage) => {
    console.log(recievedImage);
    planner.profile_pic = recievedImage.profile_pic;
    this.http.post<{message: string}>(this.url + 'auth/planner', planner)
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        this.eventPlanner = planner;
        this.eventPlannerUpdated.next(this.eventPlanner);
        this.dialog.open(SuccessComponent, {data: {message: 'Your Profile Details Updated Successfully!'}});
      }, (error) => {
        console.log(error);
    });
   });
  } else {
    this.http.post<{message: string}>(this.url + 'auth/planner', planner)
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        this.eventPlanner = planner;
        this.eventPlannerUpdated.next(this.eventPlanner);
        this.dialog.open(SuccessComponent, {data: {message: 'Your Profile Details Updated Successfully!'}});
      }, (error) => {
        console.log(error);
    });
  }
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
                     user_type: string }>(this.url + 'auth/signin', login)
    .subscribe((recievedData) => {
      console.log(recievedData.message);

      this.setAuthTimer(recievedData.expiersIn);

      this.token = recievedData.token;
      console.log(this.token);
      this.getHeaderDetails();

      if (recievedData.token) {
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date (now.getTime() + recievedData.expiersIn * 1000 );
        this.saveAuthData(recievedData.token, expirationDate );

        if (recievedData.user_type === 'serviceProvider') {
          this.router.navigate(['/sp/dash']);
        }
        if (recievedData.user_type === 'seller') {
          this.router.navigate(['/sel/dash']);
        }
        if (recievedData.user_type === 'eventPlanner') {
          this.router.navigate(['/planner']);
        }
      }
   }, (error) => {
     console.log(error);
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
   }, duration * 1000);
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
     expiarationDate : new Date(expiration),
   };
 }

}
