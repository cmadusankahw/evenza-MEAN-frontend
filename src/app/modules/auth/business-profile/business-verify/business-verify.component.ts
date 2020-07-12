import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { BusinessVerification } from 'src/app/modules/auth/auth.model';

@Component({
  selector: 'app-business-verify',
  templateUrl: './business-verify.component.html',
  styleUrls: ['./business-verify.component.scss']
})
export class BusinessVerifyComponent implements OnInit {

  @Output() businessVerifyEmit = new EventEmitter<BusinessVerification>();

  @Output() imagefile1Emit = new EventEmitter<File>();

  @Output() imagefile2Emit = new EventEmitter<File>();

  @Input() businessVerify: BusinessVerification;

  // to be modified later
  certifyUrl: any = './assets/images/merchant/nopic.png';

  // uploaded BR
  brsA: any;
  brsB: any;

  constructor() { }

  ngOnInit() {
    this.brsA = this.businessVerify.br_side_a;
    this.brsB = this.businessVerify.br_side_b;
  }


  onSideAUploaded(event) {
    const file = event.target.files[0];
    const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.brsA = reader.result;
      this.imagefile1Emit.emit(file);
    };

  }

  onSideBUploaded(event) {
    const file = event.target.files[0];
    const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.brsB = reader.result;
      this.imagefile2Emit.emit(file);
    };

  }


  // send business verify details
  updateBusinessVerify() {
    this.businessVerify.business_isverified = true; // to be modified
    this.businessVerifyEmit.emit(this.businessVerify);
    console.log(this.businessVerify);
  }

}
