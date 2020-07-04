import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdVerifyComponent } from './id-verify.component';

describe('IdVerifyComponent', () => {
  let component: IdVerifyComponent;
  let fixture: ComponentFixture<IdVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
