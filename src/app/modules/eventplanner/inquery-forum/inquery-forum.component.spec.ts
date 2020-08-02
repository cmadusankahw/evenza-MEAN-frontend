import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InqueryForumComponent } from './inquery-forum.component';

describe('InqueryForumComponent', () => {
  let component: InqueryForumComponent;
  let fixture: ComponentFixture<InqueryForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InqueryForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InqueryForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
