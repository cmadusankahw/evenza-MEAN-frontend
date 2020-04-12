import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDashPurchasesComponent } from './seller-dash-purchases.component';

describe('SellerDashPurchasesComponent', () => {
  let component: SellerDashPurchasesComponent;
  let fixture: ComponentFixture<SellerDashPurchasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerDashPurchasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerDashPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
