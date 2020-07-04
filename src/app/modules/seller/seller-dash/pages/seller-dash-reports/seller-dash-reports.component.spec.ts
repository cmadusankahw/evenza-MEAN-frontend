import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDashReportsComponent } from './seller-dash-reports.component';

describe('SellerDashReportsComponent', () => {
  let component: SellerDashReportsComponent;
  let fixture: ComponentFixture<SellerDashReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerDashReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerDashReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
