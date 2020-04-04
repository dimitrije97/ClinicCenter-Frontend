import { TestBed } from '@angular/core/testing';

import { EmergencyRoomService } from './emergency-room.service';

describe('EmergencyRoomService', () => {
  let service: EmergencyRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmergencyRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
