import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIdverifyComponent } from './admin-idverify.component';

describe('AdminIdverifyComponent', () => {
  let component: AdminIdverifyComponent;
  let fixture: ComponentFixture<AdminIdverifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminIdverifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIdverifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
