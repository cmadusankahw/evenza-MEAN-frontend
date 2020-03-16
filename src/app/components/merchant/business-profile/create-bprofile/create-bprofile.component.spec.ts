import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBprofileComponent } from './create-bprofile.component';

describe('CreateBprofileComponent', () => {
  let component: CreateBprofileComponent;
  let fixture: ComponentFixture<CreateBprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
