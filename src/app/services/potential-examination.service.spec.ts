import { TestBed } from '@angular/core/testing';

import { PotentialExaminationService } from './potential-examination.service';

describe('PotentialExaminationService', () => {
  let service: PotentialExaminationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PotentialExaminationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
