import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventplannerDashOrdersComponent } from './eventplanner-dash-orders.component';

describe('EventplannerDashOrdersComponent', () => {
  let component: EventplannerDashOrdersComponent;
  let fixture: ComponentFixture<EventplannerDashOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventplannerDashOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventplannerDashOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
