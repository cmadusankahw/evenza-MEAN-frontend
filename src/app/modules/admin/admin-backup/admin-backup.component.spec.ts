import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBackupComponent } from './admin-backup.component';

describe('AdminBackupComponent', () => {
  let component: AdminBackupComponent;
  let fixture: ComponentFixture<AdminBackupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBackupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
