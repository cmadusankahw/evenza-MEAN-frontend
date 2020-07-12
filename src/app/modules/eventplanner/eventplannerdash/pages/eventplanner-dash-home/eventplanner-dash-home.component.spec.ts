import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventplannerDashHomeComponent } from './eventplanner-dash-home.component';

describe('EventplannerDashHomeComponent', () => {
  let component: EventplannerDashHomeComponent;
  let fixture: ComponentFixture<EventplannerDashHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventplannerDashHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventplannerDashHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
