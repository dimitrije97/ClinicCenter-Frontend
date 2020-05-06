import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingOperationsComponent } from './pending-operations.component';

describe('PendingOperationsComponent', () => {
  let component: PendingOperationsComponent;
  let fixture: ComponentFixture<PendingOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
