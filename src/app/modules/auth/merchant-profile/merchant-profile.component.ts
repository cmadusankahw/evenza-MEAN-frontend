import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';


import { ErrorComponent } from 'src/app/error/error.component';
import { DatePipe } from '@angular/common';
import { Merchant } from '../auth.model';


@Component({
  selector: 'app-merchant-profile',
  templateUrl: './merchant-profile.component.html',
  styleUrls: ['./merchant-profile.component.scss']
})
export class MerchantProfileComponent implements OnInit, OnDestroy {

  private merchantSubs: Subscription;

  // edit profile mode
  editmode = false;

  // enabling ctomization only if it is the owner
  @Input() isowner: boolean;

  // bprofile data binding
  serviceProvider: Merchant;

   // image to upload
   image: File;
   imageUrl: any = './assets/images/merchant/nopic.png';


  constructor(private authService: AuthService,
              public dialog: MatDialog,
              public datepipe: DatePipe,
              private router: Router) { }

  ngOnInit() {
    this.authService.getMerchant();
    this.merchantSubs = this.authService.getMerchantUpdateListener().subscribe (
      merchant => {
          this.serviceProvider = merchant;
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
      const merchant: Merchant = {
        user_id: this.serviceProvider.user_id,
        user_type: this.serviceProvider.user_type,
        nic: editForm.value.nic,
        first_name: editForm.value.first_name,
        last_name: editForm.value.last_name,
        profile_pic: this.serviceProvider.profile_pic,
        email: editForm.value.email,
        contact_no: editForm.value.contact_no,
        address_line1: editForm.value.address_line1,
        address_line2: editForm.value.address_line2,
        postal_code: editForm.value.postal_code,
        gender: editForm.value.gender,
        date_of_birth: editForm.value.date_of_birth,
        reg_date: this.serviceProvider.reg_date,
        id_verification: this.serviceProvider.id_verification,
        business: this.serviceProvider.business
        };
      this.authService.updateMerchant(merchant, this.image);
      this.merchantSubs = this.authService.getMerchantUpdateListener()
      .subscribe((recievedMerchant: Merchant) => {
        console.log(recievedMerchant);
        this.serviceProvider = recievedMerchant;
      });
      console.log('Merchant updated successfully!');
      editForm.resetForm();
      this.editmode = false;
      setTimeout(() => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        if (this.serviceProvider.user_type === 'serviceProvider'){
          this.router.navigate(['/sp/dash/profile']);
        }
        if (this.serviceProvider.user_type === 'seller'){
          this.router.navigate(['/sel/dash/profile']);
        }
      }, 1200);
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

}
