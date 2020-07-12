import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupMerchantComponent } from './signup-merchant.component';

describe('SignupMerchantComponent', () => {
  let component: SignupMerchantComponent;
  let fixture: ComponentFixture<SignupMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupMerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
