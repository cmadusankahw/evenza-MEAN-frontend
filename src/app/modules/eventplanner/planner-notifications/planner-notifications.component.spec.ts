import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerNotificationsComponent } from './planner-notifications.component';

describe('PlannerNotificationsComponent', () => {
  let component: PlannerNotificationsComponent;
  let fixture: ComponentFixture<PlannerNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannerNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
