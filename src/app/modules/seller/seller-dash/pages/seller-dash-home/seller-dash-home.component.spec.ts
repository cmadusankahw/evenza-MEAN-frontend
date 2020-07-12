import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDashHomeComponent } from './seller-dash-home.component';

describe('SellerDashHomeComponent', () => {
  let component: SellerDashHomeComponent;
  let fixture: ComponentFixture<SellerDashHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerDashHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerDashHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
