import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProductDetailsReportComponent } from './seller-product-details-report.component';

describe('SellerProductDetailsReportComponent', () => {
  let component: SellerProductDetailsReportComponent;
  let fixture: ComponentFixture<SellerProductDetailsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerProductDetailsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerProductDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
