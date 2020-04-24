import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExaminationService } from 'src/app/services/examination.service';
import * as moment from 'moment';

@Component({
  selector: 'app-examination-redirect',
  templateUrl: './examination-redirect.component.html',
  styleUrls: ['./examination-redirect.component.css']
})
export class ExaminationRedirectComponent implements OnInit {

  validateForm: FormGroup;
  private data: any;
  private user: any;

  constructor(private message: NzMessageService, private router: Router, private fb: FormBuilder, private examinationService: ExaminationService) { }

  ngOnInit(): void {
    this.setupUser();
    this.setupData();
  }

  public setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  public setupData(): void {
    this.data = JSON.parse(localStorage.getItem('examinationData'));

    this.validateForm = this.fb.group({
      date: moment(this.data.date).format('YYYY/MM/DD'),
      startAt: this.data.startAt,
      clinic: this.data.clinic,
      doctor: this.data.doctor
    });
  }

  public confirm(): void {
    const body = {
      date: this.data.date,
      doctorId: this.data.doctorId,
      startAt: this.data.startAt,
      patientId: this.user.id
    }
    this.examinationService.createExaminationRequestAsPatient(body).subscribe(() => {
      console.log(body);
      this.message.info('Uspešno ste poslali zahtev za pregled.');
      this.router.navigateByUrl('dashboard');
    },
    error => {
      this.message.info(error.error.message);
    });
  }

}
