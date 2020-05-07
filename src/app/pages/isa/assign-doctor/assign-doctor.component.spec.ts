import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDoctorComponent } from './assign-doctor.component';

describe('AssignDoctorComponent', () => {
  let component: AssignDoctorComponent;
  let fixture: ComponentFixture<AssignDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
