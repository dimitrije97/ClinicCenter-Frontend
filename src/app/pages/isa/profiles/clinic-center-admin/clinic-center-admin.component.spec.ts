import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicCenterAdminComponent } from './clinic-center-admin.component';

describe('ClinicCenterAdminComponent', () => {
  let component: ClinicCenterAdminComponent;
  let fixture: ComponentFixture<ClinicCenterAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicCenterAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicCenterAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
