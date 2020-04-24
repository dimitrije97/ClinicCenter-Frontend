import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicsIncomeComponent } from './clinics-income.component';

describe('ClinicsIncomeComponent', () => {
  let component: ClinicsIncomeComponent;
  let fixture: ComponentFixture<ClinicsIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicsIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicsIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
