import { Component, OnInit } from '@angular/core';
import { ExaminationService } from 'src/app/services/examination.service';
import * as moment from 'moment';

@Component({
  selector: 'app-doctor-calendar',
  templateUrl: './doctor-calendar.component.html',
  styleUrls: ['./doctor-calendar.component.css']
})
export class DoctorCalendarComponent implements OnInit {

  // listDataMap = [];
  user: any;

  constructor(private examinationService: ExaminationService) { }

  ngOnInit(): void {

  }

  listDataMap = {
    eight: [
      { type: 'warning', content: 'This is warning event.' },
      { type: 'success', content: 'This is usual event.' }
    ],
    ten: [
      { type: 'warning', content: 'This is warning event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'error', content: 'This is error event.' }
    ],
    eleven: [
      { type: 'warning', content: 'This is warning event' },
      { type: 'success', content: 'This is very long usual event........' },
      { type: 'error', content: 'This is error event 1.' },
      { type: 'error', content: 'This is error event 2.' },
      { type: 'error', content: 'This is error event 3.' },
      { type: 'error', content: 'This is error event 4.' }
    ]
  };

  // ngOnInit(): void {
  //   this.setupData();
  //   this.setupUser();
  // }

  // private setupData(): void {
  //   this.examinationService.getAllExaminationsByDoctor(this.user.id).subscribe(data => {
  //     this.listDataMap = data.date;
  //   });
  // }

  // private setupUser(): void {
  //   this.user = JSON.parse(localStorage.getItem('user'));
  // } 

  // formatDate(date): String {
  //   return moment(date).format("L");
  // }

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }
}
