import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ExaminationService } from 'src/app/services/examination.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment'

@Component({
  selector: 'app-future-examinations',
  templateUrl: './future-examinations.component.html',
  styleUrls: ['./future-examinations.component.css']
})
export class FutureExaminationsComponent implements OnInit {

  public listOfData = [];
  private user: any;
  private isDoctor: boolean;
  private isPatient: boolean;
  public isAdmin: boolean;

  constructor(private message: NzMessageService, private examinationService: ExaminationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.setupUser();
    this.setupUserType();
    this.setupData();
  }

  private setupData(): void {
    if(this.isPatient){
      this.examinationService.getAllFutureExaminationsByPatient(this.user.id).subscribe(data => {
        this.listOfData = data;
      },
      error => {
        this.message.info(error.error.message);
        this.router.navigateByUrl(`dashboard`);
      });
    }else if(this.isDoctor){
      this.examinationService.getAllFutureExaminationsByDoctor(this.user.id).subscribe(data => {
        this.listOfData = data;
      },
      error => {
        this.message.info(error.error.message);
        this.router.navigateByUrl(`dashboard`);
      });
    }else if(this.isAdmin){
      this.examinationService.getAllFutureExaminationsByAdmin(this.user.myClinic.id).subscribe(data => {
        this.listOfData = data;
      },
      error => {
        this.message.info(error.error.message);
        this.router.navigateByUrl(`dashboard`);
      });
    }
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  } 

  private setupUserType(): void {
    if(this.user.userType === 'PATIENT'){
      this.isPatient = true;
      this.isDoctor = false;
      this.isAdmin = false;
    }else if(this.user.userType === 'DOCTOR'){
      this.isDoctor = true;
      this.isPatient = false;
      this.isAdmin = false
    }
    else if(this.user.userType === 'ADMIN'){
      this.isAdmin = true;
      this.isPatient = false;
      this.isDoctor = false
    }
  }

  public cancel(id): void {
    this.examinationService.cancelFutureExamination(id).subscribe(data => {
      this.setupData();
      this.message.info('Uspešno ste otkazali pregled.');
    },
    error => {
      this.message.info(error.error.message);
    });
  }

  formatDate(date): String {
    return moment(date).format("L");
  }
}
