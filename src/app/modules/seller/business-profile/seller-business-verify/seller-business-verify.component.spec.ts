import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerBusinessVerifyComponent } from './seller-business-verify.component';

describe('SellerBusinessVerifyComponent', () => {
  let component: SellerBusinessVerifyComponent;
  let fixture: ComponentFixture<SellerBusinessVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerBusinessVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerBusinessVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
