import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashUsersComponent } from './admin-dash-users.component';

describe('AdminDashUsersComponent', () => {
  let component: AdminDashUsersComponent;
  let fixture: ComponentFixture<AdminDashUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
