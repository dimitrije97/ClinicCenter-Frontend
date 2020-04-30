import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule.service';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public listOfData = [];
  private user: any;

  constructor(private scheduleService: ScheduleService, private message: NzMessageService) { }

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
        this.listOfData = data;
      });
    }else if(this.user.userType === 'NURSE'){
      this.scheduleService.getNursesSchedules(this.user.id).subscribe(data => {
        this.listOfData = data;
      });
    }
  }

  isSameDate(date1, date2): boolean{
    const one = moment(date1).format('YYYY/MM/DD');
    const two = moment(date2).format('YYYY/MM/DD');
    if(one.toString() == two.toString()){
      return true;
    }else{
      return false;
    }
  }

  public reasonOfUnavailability(item): String {
    if(item.reasonOfUnavailability === 'EXAMINATION'){
      return 'Pregled: '+item.startAt.toString()+'-'+item.endAt.toString();
    }
    return 'Odsustvo';
  }

  public click(item): void{
    if(item.reasonOfUnavailability === 'EXAMINATION'){
      this.message.info('Pregled počinje u: '+item.startAt+', a završava se u: '+item.endAt);
    }else if(item.reasonOfUnavailability === 'VACATION'){
      this.message.info('Godišnji odmor');
    }
    
  }
}
