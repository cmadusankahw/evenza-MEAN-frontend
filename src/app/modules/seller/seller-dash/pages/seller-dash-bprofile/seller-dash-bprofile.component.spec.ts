import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDashBprofileComponent } from './seller-dash-bprofile.component';

describe('SellerDashBprofileComponent', () => {
  let component: SellerDashBprofileComponent;
  let fixture: ComponentFixture<SellerDashBprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerDashBprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerDashBprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
