import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashCreateServiceComponent } from './dash-create-service.component';

describe('DashCreateServiceComponent', () => {
  let component: DashCreateServiceComponent;
  let fixture: ComponentFixture<DashCreateServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashCreateServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashCreateServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
