import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureExaminationsComponent } from './future-examinations.component';

describe('FutureExaminationsComponent', () => {
  let component: FutureExaminationsComponent;
  let fixture: ComponentFixture<FutureExaminationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutureExaminationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureExaminationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
