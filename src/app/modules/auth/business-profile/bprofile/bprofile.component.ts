import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/modules/auth/auth.service';
import { Merchant, OpenDays, BusinessLocation, BusinessVerification, Business, CardDetails } from 'src/app/modules/auth/auth.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bprofile',
  templateUrl: './bprofile.component.html',
  styleUrls: ['./bprofile.component.scss']
})
export class BprofileComponent implements OnInit, OnDestroy {

  // subscription
  private merchantSub: Subscription;

  @Input() isowner;

  // edit profile mode
  editmode = false;

  // create new profile mode
  addnew = false;

  // business-open-days edit mode
  opendaysEditable = false;

  // today date
  tday = new Date().toISOString();

  // recieved location data
  location: BusinessLocation = {
    lang: 80.0087746,
    lat: 6.901608599999999,
    homeTown: 'Colombo'
  };

  // recieved open days
  openDays: OpenDays[] =  [
    { day: 0, isopened: true, from_time: 8, to_time: 18},
    { day: 1, isopened: true,  from_time: 8, to_time: 18 },
    { day: 2, isopened: true,  from_time: 8, to_time: 18 },
    { day: 3, isopened: true,  from_time: 8, to_time: 18 },
    { day: 4, isopened: true,  from_time: 8, to_time: 18 },
    { day: 5, isopened: true,  from_time: 8, to_time: 18 },
    { day: 6, isopened: false,  from_time: 0 , to_time: 0 },
  ];

  // recieved busiiness verification
  businessVerification: BusinessVerification = {
    business_isverified: false,
    br_side_a: './assets/images/merchant/nopic.png',
    br_side_b: './assets/images/merchant/nopic.png',
  };

  // recieved card details
  cardDetails: CardDetails = {
    name_on_card: '',
    card_no: '',
    cvc_no: '',
    bank: '',
    branch: '',
    exp_month: '1',
    exp_year: '2020',
  };

  // image uploads
  featureImage: any = './assets/images/back/bprofile.jpg';
  logoImage: any = './assets/images/merchant/nopic.png';
  featureImageFile: File;
  logoImageFile: File;

  // recieved Merchant
  recievedMerchant: Merchant;



  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.getMerchant();
    this.merchantSub = this.authService.getMerchantUpdateListener()
      .subscribe ( resMerchant => {
        if (resMerchant) {
          this.recievedMerchant = resMerchant;
          this.cardDetails = resMerchant.business.card_details;
          this.businessVerification = resMerchant.business.business_verification;
          this.openDays = resMerchant.business.open_days;
          this.location = resMerchant.business.location;
          this.logoImage = resMerchant.business.logo;
          this.featureImage = resMerchant.business.feature_img;
          console.log(this.recievedMerchant);
         }});
  }

  ngOnDestroy() {
    if (this.merchantSub) {
      this.merchantSub.unsubscribe();
    }
    this.clearImages();
  }



  // is business opened
  isOpened(openDays: { day: number, from_time: number, to_time: number; }[]): boolean {
    const today = new Date();
    const HrIndex = today.getHours();
    let DayIndex = today.getDate();
    if (DayIndex > 21 ){
      DayIndex = DayIndex-21;
    } else if (DayIndex >14){
      DayIndex = DayIndex -14;
    } else if (DayIndex > 7){
      DayIndex= DayIndex - 7;
    }
    for (const od of openDays) {

      if (od.day === DayIndex - 1) {
        if (od.from_time <= HrIndex  && HrIndex <= od.to_time ){
          return true;
        }
      }
    }
    return false;
  }

  // set open days
  setOpenDays(event) {
    this.openDays = event;
    document.getElementById('openDayModalClose').click();
  }

  // set location
  setLocation(event) {
    this.location = event;
    document.getElementById('locationyModalClose').click();
  }

  // set business verification details
  setBusinessVerify(event) {
    this.businessVerification = event;
    document.getElementById('businessVerifyModalClose').click();
  }

  // set card details
  setCardDetails(event) {
    this.cardDetails = event;
    document.getElementById('cardDetailsModalClose').click();
  }


// update business profile
updateBusinessProfile(updateeBprofileForm: NgForm) {
  if (updateeBprofileForm.invalid) {
    console.log('Form Invalid');
  } else {

    const business: Business = {
      title: updateeBprofileForm.value.business_title,
      description: updateeBprofileForm.value.business_description,
      email: updateeBprofileForm.value.business_email,
      contact_no:  updateeBprofileForm.value.business_contact,
      address_line1:  updateeBprofileForm.value.business_address_line1,
      address_line2:  updateeBprofileForm.value.business_address_line2,
      postal_code:  updateeBprofileForm.value.business_postal_code,
      created_date: this.tday,
      location: this.location,
      business_verification: this.businessVerification,
      open_days: this.openDays,
      payment_verified: true, // to be modified later
      card_details: this.cardDetails,
      feature_img: this.featureImage,
      logo: this.logoImage
      };
    console.log(business);
    this.authService.updateBusinessProfile(business, [ this.featureImageFile, this.logoImageFile]);
    updateeBprofileForm.resetForm();
    this.clearImages();
    this.addnew = false;
    this.editmode = false;

    setTimeout(() => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      if (this.recievedMerchant.user_type === 'serviceProvider') {
        this.router.navigate(['/sp/dash/bprofile']);
      }
      if (this.recievedMerchant.user_type === 'seller') {
        this.router.navigate(['/sel/dash/bprofile']);
      }
    }, 1500);

  }
}

// clear image cache
clearImages() {
  this.featureImage = ( this.recievedMerchant.business != null ?
                        this.recievedMerchant.business.feature_img : './assets/images/back/bprofile.jpg');
  this.logoImage = ( this.recievedMerchant.business != null ?
                     this.recievedMerchant.business.logo : './assets/images/merchant/nopic.png');
  if (this.featureImageFile) {
    this.featureImageFile = null;
  }
  if (this.logoImageFile) {
    this.logoImageFile = null;
  }
}


  // on logo uploaded
  onLogoUploaded(event) {
    const file = event.target.files[0];
    const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.logoImage = reader.result;
      this.logoImageFile = file;
    };
  }


  // on featured image uploaded
  onFeatureImageUploaded(event) {
    const file = event.target.files[0];
    const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.featureImage = reader.result;
      this.featureImageFile = file;
    };
  }



}
