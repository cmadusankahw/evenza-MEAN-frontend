import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerProfileComponent } from './planner-profile.component';

describe('PlannerProfileComponent', () => {
  let component: PlannerProfileComponent;
  let fixture: ComponentFixture<PlannerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannerProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
