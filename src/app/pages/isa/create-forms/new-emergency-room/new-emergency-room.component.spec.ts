import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmergencyRoomComponent } from './new-emergency-room.component';

describe('NewEmergencyRoomComponent', () => {
  let component: NewEmergencyRoomComponent;
  let fixture: ComponentFixture<NewEmergencyRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEmergencyRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEmergencyRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
