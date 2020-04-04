import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPotentialExaminationComponent } from './new-potential-examination.component';

describe('NewPotentialExaminationComponent', () => {
  let component: NewPotentialExaminationComponent;
  let fixture: ComponentFixture<NewPotentialExaminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPotentialExaminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPotentialExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
