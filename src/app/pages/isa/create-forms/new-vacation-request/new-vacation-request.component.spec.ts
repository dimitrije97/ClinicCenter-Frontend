import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVacationRequestComponent } from './new-vacation-request.component';

describe('NewVacationRequestComponent', () => {
  let component: NewVacationRequestComponent;
  let fixture: ComponentFixture<NewVacationRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVacationRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVacationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
