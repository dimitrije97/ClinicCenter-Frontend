import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ScheduleService } from 'src/app/services/schedule.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-calendar',
  templateUrl: './doctor-calendar.component.html',
  styleUrls: ['./doctor-calendar.component.css']
})
export class DoctorCalendarComponent implements OnInit {

  listOfData = [];
  user: any;

  constructor(private scheduleService: ScheduleService, private message: NzMessageService, private router: Router) { }

  ngOnInit(): void {
    this.setupUser();
    this.setupData();
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  private setupData(): void {
    if(this.user.userType === 'DOCTOR'){
      this.scheduleService.getDoctorsSchedules(this.user.id).subscribe(data => {
        console.log(data);
        this.listOfData = data;
      },
      error => {
        this.router.navigateByUrl('dashboard');
        this.message.info(error.error.message);
      });
    }else if(this.user.userType === 'NURSE'){
      this.scheduleService.getNursesSchedules(this.user.id).subscribe(data => {
        console.log(data);
        this.listOfData = data;
      },
      error => {
        this.router.navigateByUrl('dashboard');
        this.message.info(error.error.message);
      });
    }
  }

  public time(startAt, endAt): String {
    if(startAt == null){
      return "00:00:00 - 24:00:00";
    }
    return startAt+" - "+endAt;
  }

  public reason(reasonOfUnavailability): String {
    if(reasonOfUnavailability == 'EXAMINATION'){
      return "Pregled";
    }else if(reasonOfUnavailability == 'VACATION'){
      return "Odsustvo";
    }
  }

}
