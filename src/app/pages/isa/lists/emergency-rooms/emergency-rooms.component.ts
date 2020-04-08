import { Component, OnInit } from '@angular/core';
import { EmergencyRoomService } from 'src/app/services/emergency-room.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-emergency-rooms',
  templateUrl: './emergency-rooms.component.html',
  styleUrls: ['./emergency-rooms.component.css']
})
export class EmergencyRoomsComponent implements OnInit {

  public listOfData = [];
  private user: any;

  constructor(private message: NzMessageService, private emergencyRoomService: EmergencyRoomService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.setupUser();
    this.setupData();
  }

  private setupData(): void {
    if(this.user.userType === 'ADMIN') {
      this.emergencyRoomService.getAllEmergencyRoomsByClinic(this.user.myClinic.id).subscribe(data => {
        this.listOfData = data;
      },
      error => {
        this.message.info(error.error.message);
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
      this.message.info('Uspešno ste obrisali salu.');
    },
    error => {
      this.message.info(error.error.message);
    });
  }
}
