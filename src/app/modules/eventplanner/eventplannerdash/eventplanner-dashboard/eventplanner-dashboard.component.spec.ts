import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventplannerDashboardComponent } from './eventplanner-dashboard.component';

describe('EventplannerDashboardComponent', () => {
  let component: EventplannerDashboardComponent;
  let fixture: ComponentFixture<EventplannerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventplannerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventplannerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
