import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { PotentialExaminationService } from 'src/app/services/potential-examination.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { EmergencyRoomService } from 'src/app/services/emergency-room.service';

@Component({
  selector: 'app-new-potential-examination',
  templateUrl: './new-potential-examination.component.html',
  styleUrls: ['./new-potential-examination.component.css']
})
export class NewPotentialExaminationComponent implements OnInit {

  public selectedDoctor = null;
  public selectedEmergencyRoom = null;
  public listOfData = [];
  public listOfData2 = [];
  public startAt = null;
  public date = null; // new Date();
  public user: any;

  constructor(private router: Router, private peService: PotentialExaminationService, private doctorService: DoctorService, private erService: EmergencyRoomService) { }

  ngOnInit() {
    this.setupUser();
    this.setupData();
  }

  private setupData(): void {
    this.doctorService.getAllDoctorsByClinic(this.user.myClinic.id).subscribe(data => {
      this.listOfData = data;
    });
    this.erService.getAllEmergencyRoomsByClinic(this.user.myClinic.id).subscribe(data => {
      this.listOfData2 = data;
    });
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  onSearch(): void {
    const body = {
      emergencyRoomId: this.selectedEmergencyRoom,
      doctorId: this.selectedDoctor,
      date: moment(this.date).format('L'),
      startAt: moment(this.startAt).format('HH:mm:ss')
    }
    this.peService.createPotentialExamination(body).subscribe(() => {
      
    });
  }
}
