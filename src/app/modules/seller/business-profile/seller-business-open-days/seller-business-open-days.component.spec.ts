import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerBusinessOpenDaysComponent } from './seller-business-open-days.component';

describe('SellerBusinessOpenDaysComponent', () => {
  let component: SellerBusinessOpenDaysComponent;
  let fixture: ComponentFixture<SellerBusinessOpenDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerBusinessOpenDaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerBusinessOpenDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
