import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerEarningsComponent } from './seller-earnings.component';

describe('SellerEarningsComponent', () => {
  let component: SellerEarningsComponent;
  let fixture: ComponentFixture<SellerEarningsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerEarningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerEarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
