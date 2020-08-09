import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerBusinessForecastComponent } from './seller-business-forecast.component';

describe('SellerBusinessForecastComponent', () => {
  let component: SellerBusinessForecastComponent;
  let fixture: ComponentFixture<SellerBusinessForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerBusinessForecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerBusinessForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
