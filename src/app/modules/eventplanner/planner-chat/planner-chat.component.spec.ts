import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerChatComponent } from './planner-chat.component';

describe('PlannerChatComponent', () => {
  let component: PlannerChatComponent;
  let fixture: ComponentFixture<PlannerChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannerChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
