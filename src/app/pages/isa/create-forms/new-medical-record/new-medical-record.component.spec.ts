import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMedicalRecordComponent } from './new-medical-record.component';

describe('NewMedicalRecordComponent', () => {
  let component: NewMedicalRecordComponent;
  let fixture: ComponentFixture<NewMedicalRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMedicalRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMedicalRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
