import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { VacationService } from 'src/app/services/vacation.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-vacation-request',
  templateUrl: './new-vacation-request.component.html',
  styleUrls: ['./new-vacation-request.component.css']
})
export class NewVacationRequestComponent implements OnInit {

  private user: any;
  startAt: Date = null;
  endAt: Date = null;
  plainFooter = 'plain extra footer';
  footerRender = () => 'extra footer';
  public listOfDates = [];

  constructor(private vacationService: VacationService, private message: NzMessageService, private router: Router) { }

  ngOnInit() {
    this.setupUser();
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);

  }

  scheduleVacation() {
    console.log(this.startAt.getDate());
    const month = this.startAt.getMonth();
    if((this.startAt.getMonth() != this.endAt.getMonth()) || (this.startAt.getFullYear() != this.endAt.getFullYear())){
      this.message.info('Za svaki mesec morate slati poseban zahtev.');
      return;
    }

    const year = this.startAt.getFullYear();
    for (let i = this.startAt.getDate(); i < this.endAt.getDate(); i++) {
      this.listOfDates.push(moment(new Date(`${year}-${month + 1}-${i}`)).format('YYYY/MM/DD'));
    }
    const body = {
      dates: this.listOfDates
    }
    this.vacationService.createVacation(body, this.user.id).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl('dashboard');
      this.message.info('Uspešno ste poslali zahtev za godišnji odmor.');
    },
    error => {
      this.message.info(error.error.message);
    });
    
  }

}
