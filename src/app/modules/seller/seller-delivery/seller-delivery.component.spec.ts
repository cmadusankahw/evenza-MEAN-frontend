import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDeliveryComponent } from './seller-delivery.component';

describe('SellerDeliveryComponent', () => {
  let component: SellerDeliveryComponent;
  let fixture: ComponentFixture<SellerDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
