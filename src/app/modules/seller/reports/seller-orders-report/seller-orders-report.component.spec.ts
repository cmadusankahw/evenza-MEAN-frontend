import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerOrdersReportComponent } from './seller-orders-report.component';

describe('SellerOrdersReportComponent', () => {
  let component: SellerOrdersReportComponent;
  let fixture: ComponentFixture<SellerOrdersReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerOrdersReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerOrdersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
