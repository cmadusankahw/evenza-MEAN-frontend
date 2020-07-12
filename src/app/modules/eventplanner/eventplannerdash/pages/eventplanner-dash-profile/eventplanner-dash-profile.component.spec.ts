import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventplannerDashProfileComponent } from './eventplanner-dash-profile.component';

describe('EventplannerDashProfileComponent', () => {
  let component: EventplannerDashProfileComponent;
  let fixture: ComponentFixture<EventplannerDashProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventplannerDashProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventplannerDashProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
