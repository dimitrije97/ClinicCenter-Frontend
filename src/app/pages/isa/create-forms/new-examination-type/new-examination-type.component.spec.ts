import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExaminationTypeComponent } from './new-examination-type.component';

describe('NewExaminationTypeComponent', () => {
  let component: NewExaminationTypeComponent;
  let fixture: ComponentFixture<NewExaminationTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewExaminationTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExaminationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
