import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyRoomsComponent } from './emergency-rooms.component';

describe('EmergencyRoomsComponent', () => {
  let component: EmergencyRoomsComponent;
  let fixture: ComponentFixture<EmergencyRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
