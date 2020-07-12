import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBookingsComponent } from './dash-bookings.component';

describe('DashBookingsComponent', () => {
  let component: DashBookingsComponent;
  let fixture: ComponentFixture<DashBookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashBookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
