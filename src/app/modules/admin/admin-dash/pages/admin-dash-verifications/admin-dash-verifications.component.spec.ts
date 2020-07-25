import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashVerificationsComponent } from './admin-dash-verifications.component';

describe('AdminDashVerificationsComponent', () => {
  let component: AdminDashVerificationsComponent;
  let fixture: ComponentFixture<AdminDashVerificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashVerificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashVerificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
