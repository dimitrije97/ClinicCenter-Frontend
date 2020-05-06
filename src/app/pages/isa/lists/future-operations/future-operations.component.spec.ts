import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureOperationsComponent } from './future-operations.component';

describe('FutureOperationsComponent', () => {
  let component: FutureOperationsComponent;
  let fixture: ComponentFixture<FutureOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutureOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
