import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDashStatComponent } from './seller-dash-stat.component';

describe('SellerDashStatComponent', () => {
  let component: SellerDashStatComponent;
  let fixture: ComponentFixture<SellerDashStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerDashStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerDashStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
