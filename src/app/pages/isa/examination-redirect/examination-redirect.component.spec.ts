import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationRedirectComponent } from './examination-redirect.component';

describe('ExaminationRedirectComponent', () => {
  let component: ExaminationRedirectComponent;
  let fixture: ComponentFixture<ExaminationRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminationRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminationRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
