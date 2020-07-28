import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCatgoriesComponent } from './event-catgories.component';

describe('EventCatgoriesComponent', () => {
  let component: EventCatgoriesComponent;
  let fixture: ComponentFixture<EventCatgoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCatgoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCatgoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
