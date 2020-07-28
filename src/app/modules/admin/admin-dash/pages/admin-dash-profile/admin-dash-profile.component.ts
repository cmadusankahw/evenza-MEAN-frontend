import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';


import { ErrorComponent } from 'src/app/error/error.component';
import { DatePipe } from '@angular/common';
import { Admin, CardDetails } from '../../../../auth/auth.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-admin-dash-profile',
  templateUrl: './admin-dash-profile.component.html',
  styleUrls: ['./admin-dash-profile.component.scss']
})
export class AdminDashProfileComponent implements OnInit, OnDestroy {

  private merchantSubs: Subscription;

  // edit profile mode
  editmode = false;

  // enabling ctomization only if it is the owner
  isowner = true;

  // bprofile data binding
  admin: Admin;

  // card details
  cardDetails: CardDetails;

   // image to upload
   image: File;
   imageUrl: any = './assets/images/merchant/nopic.png';


  constructor(private authService: AuthService,
              public dialog: MatDialog,
              public datepipe: DatePipe,
              private router: Router) { }

  ngOnInit() {
    this.authService.getAdmin();
    this.merchantSubs = this.authService.getAdminUpdatteListener().subscribe (
      admin => {
          console.log(admin);
          this.admin = admin;
          this.cardDetails = admin.card_details;
      });
  }

  ngOnDestroy() {
    if (this.merchantSubs) {
      this.merchantSubs.unsubscribe();
    }
    this.imageUrl = './assets/images/merchant/nopic.png';
    this.image = null;
  }

  changeUserPassword(pwordForm: NgForm) {
    if (pwordForm.invalid) {
      console.log('Form invalid');
    }
    if ( pwordForm.value.new_password1 !== pwordForm.value.new_password2) {
      this.dialog.open(ErrorComponent, {data: {message: 'Passwords do not match! Please try again!'}});
    }
   // this.serviceProviderService.changeUserPassword(currentPword, newPword);
  }

  // edit user
  editUser(editForm: NgForm) {
    if (editForm.invalid) {
      console.log('Form Invalid');
    } else {
      const admin: Admin = {
        user_id: this.admin.user_id,
        first_name: editForm.value.first_name,
        last_name: editForm.value.last_name,
        profile_pic: this.admin.profile_pic,
        email: editForm.value.email,
        contact_no: editForm.value.contact_no,
        address_line1: editForm.value.address_line1,
        address_line2: editForm.value.address_line2,
        postal_code: editForm.value.postal_code,
        gender: editForm.value.gender,
        card_details: this.cardDetails,
        payment_details: this.admin.payment_details,
        };
      this.authService.updateAdmin(admin, this.image);
      this.merchantSubs = this.authService.getAdminUpdatteListener()
      .subscribe((recievedUser: Admin) => {
        console.log(recievedUser);
        this.admin = recievedUser;
      });
      console.log('Merchant updated successfully!');
      editForm.resetForm();
      this.editmode = false;
    }
  }

    // profile pic uploading
    onImageUploaded(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
      const mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image = file;
        this.imageUrl = reader.result;
      };
    }


  // set card details
  setCardDetails(event) {
    this.cardDetails = event;
    document.getElementById('cardDetailsModalClose').click();
  }


}
