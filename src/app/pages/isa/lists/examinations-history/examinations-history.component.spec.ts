import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationsHistoryComponent } from './examinations-history.component';

describe('ExaminationsHistoryComponent', () => {
  let component: ExaminationsHistoryComponent;
  let fixture: ComponentFixture<ExaminationsHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminationsHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminationsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
