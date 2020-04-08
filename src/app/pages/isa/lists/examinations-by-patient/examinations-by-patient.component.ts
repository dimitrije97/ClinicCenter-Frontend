import { Component, OnInit } from '@angular/core';
import { ExaminationService } from 'src/app/services/examination.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-examinations-by-patient',
  templateUrl: './examinations-by-patient.component.html',
  styleUrls: ['./examinations-by-patient.component.css']
})
export class ExaminationsByPatientComponent implements OnInit {

  public listOfData = [];
  private user: any;

  constructor(private message: NzMessageService, private examinationService: ExaminationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.setupUser();
    this.setupData();
  }

  private setupData(): void {
    this.examinationService.getAllExaminationsByPatient(this.user.id).subscribe(data => {
      this.listOfData = data;
    },
    error => {
      this.message.info(error.error.message);
      this.router.navigateByUrl(`dashboard`);
    });
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  } 

  formatDate(date): String {
    return moment(date).format("L");
  }
}

