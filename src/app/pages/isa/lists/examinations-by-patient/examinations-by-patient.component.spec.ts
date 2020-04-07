import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationsByPatientComponent } from './examinations-by-patient.component';

describe('ExaminationsByPatientComponent', () => {
  let component: ExaminationsByPatientComponent;
  let fixture: ComponentFixture<ExaminationsByPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminationsByPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminationsByPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
