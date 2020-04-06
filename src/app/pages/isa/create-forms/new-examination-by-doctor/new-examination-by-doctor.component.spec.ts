import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExaminationByDoctorComponent } from './new-examination-by-doctor.component';

describe('NewExaminationByDoctorComponent', () => {
  let component: NewExaminationByDoctorComponent;
  let fixture: ComponentFixture<NewExaminationByDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewExaminationByDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExaminationByDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
