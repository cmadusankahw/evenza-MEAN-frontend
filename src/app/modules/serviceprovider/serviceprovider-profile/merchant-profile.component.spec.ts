import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantProfileComponent } from './merchant-profile.component';

describe('MerchantProfileComponent', () => {
  let component: MerchantProfileComponent;
  let fixture: ComponentFixture<MerchantProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
