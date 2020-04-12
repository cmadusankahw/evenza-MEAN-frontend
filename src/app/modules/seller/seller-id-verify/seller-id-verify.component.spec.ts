import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerIdVerifyComponent } from './seller-id-verify.component';

describe('SellerIdVerifyComponent', () => {
  let component: SellerIdVerifyComponent;
  let fixture: ComponentFixture<SellerIdVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerIdVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerIdVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
