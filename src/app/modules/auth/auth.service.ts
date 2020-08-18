import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {
  Merchant,
  EventPlanner,
  User,
  MerchantTemp,
  LogIn,
  Business,
  Admin,
  IdVerification,
  BusinessVerification,
  IdVerifications,
  BusinessVerifications,
} from './auth.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SuccessComponent } from 'src/app/success/success.component';
import { getUrl } from 'src/assets/url';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Observer Pattern: Subjects
  private merchantUpdated = new Subject<Merchant>();
  private eventPlannerUpdated = new Subject<EventPlanner>();
  private userUpdated = new Subject<User[]>();
  private lastIdUpdated = new Subject<string>();
  private adminUpdated = new Subject<Admin>();
  private merchantsUpdated = new Subject<any[]>();
  private idverifyUpdated = new Subject<IdVerifications[]>();
  private businessverifyUpdated = new Subject<BusinessVerifications[]>();

  // to get merchant/event planner once logged in
  private merchant: Merchant;
  private eventPlanner: EventPlanner;
  // recieved merchants
  private merchants: any[] = [];
  // recieved users
  private users: User[] = [];
  // for merchant data passing
  private merchantTemp: MerchantTemp;
  // user type between signup pages
  private userType = false;
  // api url
  private url = getUrl();
  // last signed user id
  private lastId: string;
  // storing token for auth validation
  private token: string;
  // timer to auto logout
  private tokenTimer: any;
  // login details listener
  private authStatusListener = new Subject<boolean>();
  // details for app header
  private headerDetailsListener = new Subject<{
    userType: string;
    userName: string;
    profilePic: string;
  }>();
  private headerDetails: {
    userType: string;
    userName: string;
    profilePic: string;
  };
  // user login status
  private isAuthenticated = false;
  // recieved admin
  private admin: Admin;
  // verifications
  private idVerifications: IdVerifications[] = [];
  private businessVerifications: BusinessVerifications[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) { }

  // get methods

  // get merchant details temperary btween signup component steps
  public getMerchantTemp() {
    if (this.merchantTemp) {
      return this.merchantTemp;
    }
  }

  // get users list to login
  public getUser() {
    this.http
      .get<{ message: string; users: User[] }>(this.url + 'auth/user/get')
      .subscribe((recievedUsers) => {
        this.users = recievedUsers.users;
        this.userUpdated.next([...this.users]);
      });
  }

  // get merchant after login
  public getMerchant() {
    this.http
      .get<{ message: string; merchant: Merchant }>(
        this.url + 'auth/merchant/get'
      )
      .subscribe((recievedMerchant) => {
        this.merchant = recievedMerchant.merchant;
        this.merchantUpdated.next(this.merchant);
      });
  }

  // get a merchant by ID for public profile view
  public getMerchantbyId(id: string) {
    this.http
      .get<{ message: string; merchant: Merchant }>(
        this.url + 'auth/merchant/get/' + id
      )
      .subscribe((recievedMerchant) => {
        this.merchant = recievedMerchant.merchant;
        this.merchantUpdated.next(this.merchant);
      });
  }

  // get event planner after login
  public getEventPlanner() {
    this.http
      .get<{ message: string; eventPlanner: EventPlanner }>(
        this.url + 'auth/planner/get'
      )
      .subscribe((recievedMerchant) => {
        this.eventPlanner = recievedMerchant.eventPlanner;
        this.eventPlannerUpdated.next(this.eventPlanner);
      });
  }

  // get event planner after login
  public getAdmin() {
    this.http
      .get<{ message: string; admin: Admin }>(this.url + 'auth/admin/get')
      .subscribe((recievedMerchant) => {
        this.admin = recievedMerchant.admin;
        this.adminUpdated.next(this.admin);
      });
  }

  // get all merchants list for admin
  public getMerchants() {
    this.http
      .get<{ message: string; merchants: any[] }>(
        this.url + 'auth/merchant/get/all'
      )
      .subscribe((recievedMerchant) => {
        this.merchants = recievedMerchant.merchants;
        this.merchantsUpdated.next(this.merchants);
      });
  }

  // get details for header
  public getHeaderDetails() {
    if (this.token) {
      this.http
        .get<{ user_type: string; user_name: string; profile_pic: string }>(
          this.url + 'auth/header'
        )
        .subscribe((recievedHeader) => {
          this.headerDetails = {
            userType: recievedHeader.user_type,
            userName: recievedHeader.user_name,
            profilePic: recievedHeader.profile_pic,
          };
          this.headerDetailsListener.next(this.headerDetails);
        });
    }
  }

  // get Merchants Identity  verification state for business profile creation
  public getIDVerifications() {
    this.http
      .get<{ message: string; verifications: IdVerifications[] }>(
        this.url + 'auth/verify/get/id'
      )
      .subscribe((res) => {
        this.idVerifications = res.verifications;
        this.idverifyUpdated.next([...this.idVerifications]);
      });
  }

  // get merchant business profile verification details Update business verify sttus
  public getBusinessVerifications() {
    this.http
      .get<{ message: string; verifications: BusinessVerifications[] }>(
        this.url + 'auth/verify/get/br'
      )
      .subscribe((res) => {
        this.businessVerifications = res.verifications;
        this.businessverifyUpdated.next([...this.businessVerifications]);
      });
  }

  // add id verifications details for submission
  public approveIDVerification(id: IdVerifications) {
    this.http
      .post<{ message: string }>(this.url + 'auth/verify/update/id', id)
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/admin/verify']);
        this.dialog.open(SuccessComponent, {
          data: { message: 'ID Verification added Successfully!' },
        });
      });
  }

  // add  business verifications details fro submissio
  public approveBusinessVerification(id: BusinessVerifications) {
    this.http
      .post<{ message: string }>(this.url + 'auth/verify/update/br', id)
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/admin/verify']);
        this.dialog.open(SuccessComponent, {
          data: { message: 'Business Verification added Successfully!' },
        });
      });
  }

  // get user type in signup-select
  public getUserType() {
    return this.userType;
  }

  // get last product id
  public getLastUserId() {
    this.http
      .get<{ lastid: string }>(this.url + 'auth/last')
      .subscribe((recievedId) => {
        console.log(recievedId.lastid);
        this.lastId = recievedId.lastid;
        this.lastIdUpdated.next(this.lastId);
      });
  }

  // get token to be used by other services
  public getToken() {
    return this.token;
  }

  // get authentication status
  public getisAuth() {
    return this.isAuthenticated;
  }

  // setters

  // remove merchants by admin only
  public removeMerchant(userId: string) {
    this.http
      .delete<{ message: string }>(this.url + 'auth/merchant/remove/' + userId)
      .subscribe((recievedData) => {
        const updatedMerchants = this.merchants.filter(
          (merchant) => merchant.user_id !== userId
        );
        this.merchants = updatedMerchants;
        this.merchantsUpdated.next([...this.merchants]);
        this.dialog.open(SuccessComponent, {
          data: { message: 'Merchant has Removed!' },
        });
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/admin/users']);
      });
  }

  // add merchant
  public addMerchant(merchant: Merchant, password: string) {
    const user: User = {
      user_id: merchant.user_id,
      user_type: merchant.user_type,
      email: merchant.email,
      password,
      state: false,
    };
    this.http
      .post<{ message: string; result: User }>(
        this.url + 'auth/user/signup',
        user
      )
      .subscribe(
        (recievedData) => {
          console.log(recievedData.message);
          console.log(recievedData.result);
          this.users.push(user);
          this.userUpdated.next([...this.users]);
          this.http
            .post<{ message: string }>(
              this.url + 'auth/merchant/signup',
              merchant
            )
            .subscribe(
              (recievedMessage) => {
                console.log(recievedMessage.message);
                this.getLastUserId();
                this.dialog.open(SuccessComponent, {
                  data: {
                    message: 'Signed up successfully! Welcome to Evenza!',
                  },
                });
              },
              (error) => {
                console.log(error);
              }
            );
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // add event planner
  public addEventPlanner(eventPlanner: EventPlanner, password: string) {
    const user: User = {
      user_id: eventPlanner.user_id,
      user_type: 'eventPlanner',
      email: eventPlanner.email,
      password,
      state: false,
    };
    this.http
      .post<{ message: string; result: User }>(
        this.url + 'auth/user/signup',
        user
      )
      .subscribe(
        (recievedData) => {
          console.log(recievedData.message);
          console.log(recievedData.result);
          this.users.push(user);
          this.userUpdated.next([...this.users]);
          this.http
            .post<{ message: string }>(
              this.url + 'auth/planner/signup',
              eventPlanner
            )
            .subscribe(
              (recievedMessage) => {
                console.log(recievedMessage.message);
                this.getLastUserId();
                this.dialog.open(SuccessComponent, {
                  data: {
                    message: 'Signed up successfully! Welcome to Evenza!',
                  },
                });
              },
              (error) => {
                console.log(error);
              }
            );
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // update merchant
  public updateMerchant(merchant: Merchant, image: File) {
    if (image) {
      const newMerchant = new FormData();
      newMerchant.append('images[]', image, image.name);
      console.log(newMerchant);

      this.http
        .post<{ profile_pic: string }>(
          this.url + 'auth/img/add',
          newMerchant
        )
        .subscribe((recievedImage) => {
          console.log(recievedImage);
          merchant.profile_pic = recievedImage.profile_pic;
          this.http
            .post<{ message: string }>(this.url + 'auth/merchant/edit', merchant)
            .subscribe(
              (recievedData) => {
                console.log(recievedData.message);
                this.merchant = merchant;
                this.merchantUpdated.next(this.merchant);
                this.dialog.open(SuccessComponent, {
                  data: {
                    message: 'Your Profile Details Updated Successfully!',
                  },
                });
              },
              (error) => {
                console.log(error);
              }
            );
        });
    } else {
      this.http
        .post<{ message: string }>(this.url + 'auth/merchant/edit', merchant)
        .subscribe(
          (recievedData) => {
            console.log(recievedData.message);
            this.merchant = merchant;
            this.merchantUpdated.next(this.merchant);
            this.dialog.open(SuccessComponent, {
              data: { message: 'Your Profile Details Updated Successfully!' },
            });
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  // update admin
  public updateAdmin(admin: Admin, image: File) {
    if (image) {
      const newImage = new FormData();
      newImage.append('images[]', image, image.name);

      this.http
        .post<{ profile_pic: string }>(this.url + 'auth/img/add', newImage)
        .subscribe((recievedImage) => {
          console.log(recievedImage);
          admin.profile_pic = recievedImage.profile_pic;
          this.http
            .post<{ message: string }>(this.url + 'auth/admin/edit', admin)
            .subscribe(
              (recievedData) => {
                console.log(recievedData.message);
                this.admin = admin;
                this.adminUpdated.next(this.admin);
                this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                this.router.onSameUrlNavigation = 'reload';
                this.router.navigate(['/admin/profile']);
                this.dialog.open(SuccessComponent, {
                  data: {
                    message: 'Your Profile Details Updated Successfully!',
                  },
                });
              },
              (error) => {
                console.log(error);
              }
            );
        });
    } else {
      this.http
        .post<{ message: string }>(this.url + 'auth/admin/edit', admin)
        .subscribe(
          (recievedData) => {
            console.log(recievedData.message);
            this.admin = admin;
            this.adminUpdated.next(this.admin);
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate(['/admin/profile']);
            this.dialog.open(SuccessComponent, {
              data: { message: 'Your Profile Details Updated Successfully!' },
            });
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  // update merchant buiness profile
  public updateBusinessProfile(business: Business, imgArray: File[]) {
    const imageData = new FormData();
    const currentImg = [];
    let j = 0;
    for (const image of imgArray) {
      if (image) {
        imageData.append('images[]', image, image.name);
        currentImg.push(j);
      }
      j++;
    }
    console.log(imageData);
    console.log(currentImg);
    this.http
      .post<{ imagePaths: string[] }>(this.url + 'auth/img/mul', imageData)
      .subscribe((recievedImages) => {
        console.log(recievedImages);
        recievedImages.imagePaths.find((img) => {
          if (currentImg.includes(1)) {
            business.logo = img;
            currentImg.pop();
          } else if (currentImg.includes(0)) {
            business.feature_img = img;
            currentImg.pop();
          }
        });
        this.http
          .post<{ message: string; result: Merchant }>(
            this.url + 'auth/business/edit',
            business
          )
          .subscribe((recievedData) => {
            console.log(recievedData.message);
            console.log(recievedData.result);
            this.dialog.open(SuccessComponent, {
              data: { message: 'Business Profile Successfully Updated!' },
            });
          });
      });
  }

  // update planner
  public updateEventPlanner(planner: EventPlanner, image: File) {
    if (image) {
      const newPlanner = new FormData();
      newPlanner.append('images[]', image, image.name);
      console.log(newPlanner);

      this.http
        .post<{ profile_pic: string }>(
          this.url + 'auth/img/add',
          newPlanner
        )
        .subscribe((recievedImage) => {
          console.log(recievedImage);
          planner.profile_pic = recievedImage.profile_pic;
          this.http
            .post<{ message: string }>(this.url + 'auth/planner/edit', planner)
            .subscribe(
              (recievedData) => {
                console.log(recievedData.message);
                this.eventPlanner = planner;
                this.eventPlannerUpdated.next(this.eventPlanner);
                this.dialog.open(SuccessComponent, {
                  data: {
                    message: 'Your Profile Details Updated Successfully!',
                  },
                });
              },
              (error) => {
                console.log(error);
              }
            );
        });
    } else {
      this.http
        .post<{ message: string }>(this.url + 'auth/planner/edit', planner)
        .subscribe(
          (recievedData) => {
            console.log(recievedData.message);
            this.eventPlanner = planner;
            this.eventPlannerUpdated.next(this.eventPlanner);
            this.dialog.open(SuccessComponent, {
              data: { message: 'Your Profile Details Updated Successfully!' },
            });
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  // user profile change password
  public changeUserPassword(
    currentPass: string,
    newPass: string
  ) {
    this.http
      .post<{ message: string }>(this.url + 'auth/password/reset', { currentPass, newPass })
      .subscribe(
        (recievedData) => {
          console.log(recievedData.message);
          this.signOut();
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/']);
          this.dialog.open(SuccessComponent, {
            data: { message: recievedData.message },
          });
        }
      );
  }

  // deactivate merchant profile
  public deativateAccount(userId: string) {
    this.http
      .delete<{ message: string }>(this.url + 'auth/merchant/remove/' + userId)
      .subscribe(
        (recievedData) => {
          console.log(recievedData.message);
          this.signOut();
          this.dialog.open(SuccessComponent, {
            data: { message: recievedData.message },
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // add a new Merchant Temp
  public setMerchantTemp(merchantTemp: MerchantTemp) {
    this.merchantTemp = merchantTemp;
  }

  // set user type
  public setUserType(userType: boolean) {
    this.userType = userType;
    console.log(this.userType);
  }

  // verifications
  public IDVerify(id: IdVerification, images: File[]) {
    const newImages = new FormData();
    for (const image of images) {
      if (image) {
        newImages.append('images[]', image, image.name);
      }

      this.http
        .post<{ imagePaths: string[] }>(
          this.url + 'auth/img/mul',
          newImages
        )
        .subscribe((recievedImages) => {
          if (recievedImages.imagePaths[0]) {
            id.id_sideA = recievedImages.imagePaths[0];
          }
          if (recievedImages.imagePaths[1]) {
            id.id_sideB = recievedImages.imagePaths[1];
          }
          this.http
            .post<{ message: string }>(this.url + 'auth/verify/add/id', id)
            .subscribe(
              (recievedData) => {
                console.log(recievedData.message);
                this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                this.router.onSameUrlNavigation = 'reload';
                this.router.navigate(['/sp/dash/bprofile']);
                this.dialog.open(SuccessComponent, {
                  data: {
                    message: 'ID Verification Details submitted for Review!',
                  },
                });
              },
              (error) => {
                console.log(error);
              }
            );
        });
    }
  }

  // verifications
  public BusinessVerify(id: BusinessVerification, images: File[]) {
    const newImages = new FormData();
    for (const image of images) {
      if (image) {
        newImages.append('images[]', image, image.name);
      }

      this.http
        .post<{ imagePaths: string[] }>(
          this.url + 'auth/img/mul',
          newImages
        )
        .subscribe((recievedImages) => {
          if (recievedImages.imagePaths[0]) {
            id.br_side_a = recievedImages.imagePaths[0];
          }
          if (recievedImages.imagePaths[1]) {
            id.br_side_b = recievedImages.imagePaths[1];
          }
          this.http
            .post<{ message: string }>(this.url + 'auth/verify/add/br', id)
            .subscribe(
              (recievedData) => {
                console.log(recievedData.message);
                this.dialog.open(SuccessComponent, {
                  data: {
                    message:
                      'Business Verification Details submitted for Review!',
                  },
                });
              },
              (error) => {
                console.log(error);
              }
            );
        });
    }
  }

  // log in user
  public signIn(login: LogIn) {
    this.http
      .post<{
        message: string;
        token: any;
        expiersIn: number;
        user_type: string;
      }>(this.url + 'auth/signin', login)
      .subscribe(
        (recievedData) => {
          console.log(recievedData.message);

          this.setAuthTimer(recievedData.expiersIn);

          this.token = recievedData.token;
          console.log(this.token);
          this.getHeaderDetails();

          if (recievedData.token) {
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + recievedData.expiersIn * 1000
            );
            this.saveAuthData(recievedData.token, expirationDate);

            if (recievedData.user_type === 'serviceProvider') {
              this.router.navigate(['/sp/dash']);
            }
            if (recievedData.user_type === 'seller') {
              this.router.navigate(['/sel/dash']);
            }
            if (recievedData.user_type === 'eventPlanner') {
              this.router.navigate(['/planner']);
            }
            if (recievedData.user_type === 'admin') {
              this.router.navigate(['/admin']);
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // auto auth user after restart
  public autoAuthUser() {
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
  public signOut() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
  }

  // starts the session timer
  private setAuthTimer(duration: number) {
    console.log('Setting timer to : ' + duration);
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
      expiarationDate: new Date(expiration),
    };
  }

  // Observer Pattern:  listners for subjects

  public getMerchantUpdateListener() {
    return this.merchantUpdated.asObservable();
  }

  public getEventPlannerUpdateListener() {
    return this.eventPlannerUpdated.asObservable();
  }

  public getUserUpdateListener() {
    return this.userUpdated.asObservable();
  }

  public getLastIdUpdateListener() {
    return this.lastIdUpdated.asObservable();
  }

  public getAuhStatusListener() {
    return this.authStatusListener.asObservable();
  }

  public getHeaderDetailsListener() {
    return this.headerDetailsListener.asObservable();
  }

  public getAdminUpdatteListener() {
    return this.adminUpdated.asObservable();
  }

  public getMerchansUpdateListener() {
    return this.merchantsUpdated.asObservable();
  }

  public getIDVerificationsUpdateListener() {
    return this.idverifyUpdated.asObservable();
  }

  public getBusinessVerificationsUpdateListener() {
    return this.businessverifyUpdated.asObservable();
  }
}
