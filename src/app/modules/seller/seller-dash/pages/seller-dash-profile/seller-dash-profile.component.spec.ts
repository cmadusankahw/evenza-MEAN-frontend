import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDashProfileComponent } from './seller-dash-profile.component';

describe('SellerDashProfileComponent', () => {
  let component: SellerDashProfileComponent;
  let fixture: ComponentFixture<SellerDashProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerDashProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerDashProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
