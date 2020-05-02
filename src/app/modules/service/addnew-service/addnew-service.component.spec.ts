import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewServiceComponent } from './addnew-service.component';

describe('AddnewServiceComponent', () => {
  let component: AddnewServiceComponent;
  let fixture: ComponentFixture<AddnewServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
