import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDashOrdersComponent } from './seller-dash-orders.component';

describe('SellerDashOrdersComponent', () => {
  let component: SellerDashOrdersComponent;
  let fixture: ComponentFixture<SellerDashOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerDashOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerDashOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
