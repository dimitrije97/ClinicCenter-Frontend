import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialExaminationsComponent } from './potential-examinations.component';

describe('PotentialExaminationsComponent', () => {
  let component: PotentialExaminationsComponent;
  let fixture: ComponentFixture<PotentialExaminationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotentialExaminationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentialExaminationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
