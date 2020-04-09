import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicsWhichCanBeGradedComponent } from './clinics-which-can-be-graded.component';

describe('ClinicsWhichCanBeGradedComponent', () => {
  let component: ClinicsWhichCanBeGradedComponent;
  let fixture: ComponentFixture<ClinicsWhichCanBeGradedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicsWhichCanBeGradedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicsWhichCanBeGradedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
