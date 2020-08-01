import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventServiceSearchComponent } from './event-service-search.component';

describe('EventServiceSearchComponent', () => {
  let component: EventServiceSearchComponent;
  let fixture: ComponentFixture<EventServiceSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventServiceSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventServiceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
