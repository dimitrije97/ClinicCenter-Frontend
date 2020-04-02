import { TestBed } from '@angular/core/testing';

import { ClinicCenterAdminService } from './clinic-center-admin.service';

describe('ClinicCenterAdminService', () => {
  let service: ClinicCenterAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClinicCenterAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
