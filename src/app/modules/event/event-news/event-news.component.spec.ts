import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventNewsComponent } from './event-news.component';

describe('EventNewsComponent', () => {
  let component: EventNewsComponent;
  let fixture: ComponentFixture<EventNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
