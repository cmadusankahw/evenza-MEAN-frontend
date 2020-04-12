import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerBprofileComponent } from './seller-bprofile.component';

describe('SellerBprofileComponent', () => {
  let component: SellerBprofileComponent;
  let fixture: ComponentFixture<SellerBprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerBprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerBprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
