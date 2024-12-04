import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRegFormComponent } from './event-reg-form.component';

describe('EventRegFormComponent', () => {
  let component: EventRegFormComponent;
  let fixture: ComponentFixture<EventRegFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventRegFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventRegFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
