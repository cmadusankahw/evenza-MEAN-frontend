import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPaymentsReportComponent } from './seller-payments-report.component';

describe('SellerPaymentsReportComponent', () => {
  let component: SellerPaymentsReportComponent;
  let fixture: ComponentFixture<SellerPaymentsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerPaymentsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerPaymentsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
