import { Component, OnInit } from '@angular/core';


export interface IDVerify  {
  isverified: string;
  id_type: string;
  sideA_image: object;
  sideB_image: object;
}

@Component({
  selector: 'app-seller-id-verify',
  templateUrl: './seller-id-verify.component.html',
  styleUrls: ['./seller-id-verify.component.scss']
})
export class SellerIdVerifyComponent implements OnInit {

  sideAUrl: any = './assets/images/merchant/nopic.png';
  sideBUrl: any = './assets/images/merchant/nopic.png';

  constructor() { }

  ngOnInit() {
  }

  onSideAUploaded(event) {
    const file = event.target.files[0];
    const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.sideAUrl = reader.result;
    };
    return file;
  }

  onSideBUploaded(event) {
    const file = event.target.files[0];
    const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.sideBUrl = reader.result;
    };
    return file;
  }

}
