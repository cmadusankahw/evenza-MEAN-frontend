import { Component, OnInit } from '@angular/core';

import { BusinessVerify } from '../../serviceprovider.model';

@Component({
  selector: 'app-business-verify',
  templateUrl: './business-verify.component.html',
  styleUrls: ['./business-verify.component.scss']
})
export class BusinessVerifyComponent implements OnInit {

  sideAUrl: any = './assets/images/merchant/nopic.png';
  sideBUrl: any = './assets/images/merchant/nopic.png';
  certifyUrl: any = './assets/images/merchant/nopic.png';

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

  onCertifyUploaded(event) {
    const file = event.target.files[0];
    const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.certifyUrl = reader.result;
    };
    return file;
  }

}
