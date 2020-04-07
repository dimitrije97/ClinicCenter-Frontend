import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmingExaminationsComponent } from './confirming-examinations.component';

describe('ConfirmingExaminationsComponent', () => {
  let component: ConfirmingExaminationsComponent;
  let fixture: ComponentFixture<ConfirmingExaminationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmingExaminationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmingExaminationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
