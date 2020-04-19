import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRegistrationComponent } from './pending-registration.component';

describe('PendingRegistrationComponent', () => {
  let component: PendingRegistrationComponent;
  let fixture: ComponentFixture<PendingRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
