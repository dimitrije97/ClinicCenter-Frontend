import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ExaminationService } from 'src/app/services/examination.service';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-new-examination-by-doctor',
  templateUrl: './new-examination-by-doctor.component.html',
  styleUrls: ['./new-examination-by-doctor.component.css']
})
export class NewExaminationByDoctorComponent implements OnInit {

  public time: Date | null = null;
  public date: Date = null;
  public user: any;
  public validateForm: FormGroup;
  id: any;

  constructor(private message: NzMessageService, private router: Router, private route: ActivatedRoute, private examinationService: ExaminationService, private fb: FormBuilder) { }

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
      date: moment(this.date).format('L'),
      startAt: moment(this.time).format('HH:mm:ss'),
      currentTime: moment().format('HH:mm:ss'),
      patientId: this.id

    }
    this.examinationService.createExaminationRequestAsDoctor(body, this.user.id).subscribe(data => {
      console.log(data);
      this.message.info('Uspešno ste poslali zahtev za novi pregled.')
    },
    error => {
      // this.message.info(error.error.message);
      this.message.info('Sva polja moraju biti popunjena.');
    });
  }

}
