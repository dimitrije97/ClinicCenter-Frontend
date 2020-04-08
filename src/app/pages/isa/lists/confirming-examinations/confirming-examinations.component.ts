import { Component, OnInit } from '@angular/core';
import { ExaminationService } from 'src/app/services/examination.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-confirming-examinations',
  templateUrl: './confirming-examinations.component.html',
  styleUrls: ['./confirming-examinations.component.css']
})
export class ConfirmingExaminationsComponent implements OnInit {

  public listOfData = [];
  private user: any;

  constructor(private message: NzMessageService, private examinationService: ExaminationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.setupUser();
    this.setupData();
  }

  private setupData(): void {
    this.examinationService.getAllConfirmingExaminationsByPatient(this.user.id).subscribe(data => {
      this.listOfData = data;
    },
    error => {
      this.message.info(error.error.message);
    });
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  } 

  confirm(id): void {
    const body = {
      examinationId: id
    }
    this.examinationService.approveExamination(body).subscribe(data => {
      this.setupData();
      this.message.info('Uspešno ste zakazali pregled.');
    },
    error => {
      this.message.info(error.error.message);
    });
  }
  
  deny(id): void {
    const body = {
      examinationId: id,
      reason: ""
    }
    console.log(body)
    this.examinationService.denyExamination(body).subscribe(data => {
      this.setupData();
    },
    error => {
      this.message.info(error.error.message);
    });
  }

  formatDate(date): String {
    return moment(date).format("L");
  }
}

