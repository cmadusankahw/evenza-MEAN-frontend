import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantDashComponent } from './merchant-dash.component';

describe('MerchantDashComponent', () => {
  let component: MerchantDashComponent;
  let fixture: ComponentFixture<MerchantDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
