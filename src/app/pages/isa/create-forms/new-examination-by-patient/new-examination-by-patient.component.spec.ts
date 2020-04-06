import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExaminationByPatientComponent } from './new-examination-by-patient.component';

describe('NewExaminationByPatientComponent', () => {
  let component: NewExaminationByPatientComponent;
  let fixture: ComponentFixture<NewExaminationByPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewExaminationByPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExaminationByPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
