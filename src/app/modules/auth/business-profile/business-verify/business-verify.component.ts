import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';

import { BusinessVerification } from 'src/app/modules/auth/auth.model';
import { AuthService } from '../../auth.service';
import { ErrorComponent } from 'src/app/error/error.component';

@Component({
  selector: 'app-business-verify',
  templateUrl: './business-verify.component.html',
  styleUrls: ['./business-verify.component.scss']
})
export class BusinessVerifyComponent implements OnInit, OnDestroy {

  // to be modified later
  braAUrl: any = './assets/images/merchant/nopic.png';
  braBUrl: any = './assets/images/merchant/nopic.png';

  // uploaded BR
  brsA: File;
  brsB: File;

  constructor(private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit() {
  }


  ngOnDestroy(){
    this.braAUrl = './assets/images/merchant/nopic.png';
    this.braBUrl = './assets/images/merchant/nopic.png';

    this.brsB = null;
    this.brsA = null;
  }

  verifyBusiness() {
      if (this.brsA || this.brsB ) {

        const businessVerify: BusinessVerification = {
          business_isverified: true,
          br_side_a: './assets/images/merchant/nopic.png',
          br_side_b : './assets/images/merchant/bopic.png',
        };
        this.authService.BusinessVerify(businessVerify, [this.brsA, this.brsB]);
      } else {
        this.dialog.open(ErrorComponent, {data: {message: 'Please upload both sides of the BR!'}});
      }
  }


    // sideA pic uploading
    onSideAUploaded(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
      const mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.brsA = file;
        this.braAUrl = reader.result;
      };
    }

      // sideB pic uploading
      onSideBUploaded(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        const mimeType = file.type;
        if (mimeType.match(/image\/*/) == null) {
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.brsB = file;
          this.braBUrl = reader.result;
        };
      }

}
