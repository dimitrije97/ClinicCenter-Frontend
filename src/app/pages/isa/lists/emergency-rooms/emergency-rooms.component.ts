import { Component, OnInit } from '@angular/core';
import { EmergencyRoomService } from 'src/app/services/emergency-room.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-emergency-rooms',
  templateUrl: './emergency-rooms.component.html',
  styleUrls: ['./emergency-rooms.component.css']
})
export class EmergencyRoomsComponent implements OnInit {

  public listOfData = [];
  private user: any;

  constructor(private emergencyRoomService: EmergencyRoomService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.setupUser();
    this.setupData();
  }

  private setupData(): void {
    if(this.user.userType === 'ADMIN') {
      this.emergencyRoomService.getAllEmergencyRoomsByClinic(this.user.myClinic.id).subscribe(data => {
        this.listOfData = data;
      });
    }
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  } 

  update(id) {
    this.router.navigateByUrl(`dashboard/profile/${id}/emergency-room`);
  }

  delete(id) {
    this.emergencyRoomService.deleteEmergencyRoom(id).subscribe(() => {
      this.setupData();
    },
    error => {
      const message = error.error.message;
      console.log(message)
    });
  }
}
