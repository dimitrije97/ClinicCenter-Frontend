import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { OperationService } from 'src/app/services/operation.service';
import * as moment from 'moment';

@Component({
  selector: 'app-new-operation',
  templateUrl: './new-operation.component.html',
  styleUrls: ['./new-operation.component.css']
})
export class NewOperationComponent implements OnInit {

  public time: Date | null = null;
  public date: Date = null;
  public startAt: Date | null = null;
  public user: any;
  id: any;

  constructor(private message: NzMessageService, private route: ActivatedRoute, private operationService: OperationService) { }

  ngOnInit() {
    this.setupUser();
    this.extractId();
  }

  private extractId(): void {
    this.id = this.route.snapshot.params.id;
  }

  public setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  public onSchedule(): void {
    const body = {
      date: moment(this.date).format('YYYY/MM/DD'),
      currentTime: moment().format('HH:mm:ss'),
      patientId: this.id,
      doctorId: this.user.id,
      startAt: moment(this.startAt).format('HH:mm:ss'),
    }
    console.log(body);
    this.operationService.createOperationRequest(body).subscribe(data => {
      this.message.info('Uspešno ste poslali zahtev za novu operaciju.')
    },
    error => {
      this.message.info(error.error.message);
    });
  }

}
