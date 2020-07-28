import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { IdVerification } from '../auth.model';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from 'src/app/error/error.component';

@Component({
  selector: 'app-id-verify',
  templateUrl: './id-verify.component.html',
  styleUrls: ['./id-verify.component.scss']
})
export class IdVerifyComponent implements OnInit, OnDestroy {

  sideAUrl: any = './assets/images/merchant/nopic.png';
  sideBUrl: any = './assets/images/merchant/nopic.png';

  sideA: File;
  sideB: File;

  issuer: string = '';


  constructor(private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.sideAUrl = './assets/images/merchant/nopic.png';
    this.sideBUrl = './assets/images/merchant/nopic.png';

    this.sideA = null;
    this.sideB = null;
  }

  verifyID() {
      if (this.sideA || this.sideB ){

        const idVerify: IdVerification = {
          isverified: true,
          id_sideA: './assets/images/merchant/nopic.png',
          id_sideB : './assets/images/merchant/nopic.png',
          issuer: this.issuer
        };
        this.authService.IDVerify(idVerify, [this.sideA, this.sideB]);
      }  else {
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
        this.sideA = file;
        this.sideAUrl = reader.result;
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
          this.sideB = file;
          this.sideBUrl = reader.result;
        };
      }

}
