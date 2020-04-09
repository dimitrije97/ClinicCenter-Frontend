import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsWhoCanBeGradedComponent } from './doctors-who-can-be-graded.component';

describe('DoctorsWhoCanBeGradedComponent', () => {
  let component: DoctorsWhoCanBeGradedComponent;
  let fixture: ComponentFixture<DoctorsWhoCanBeGradedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorsWhoCanBeGradedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsWhoCanBeGradedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
