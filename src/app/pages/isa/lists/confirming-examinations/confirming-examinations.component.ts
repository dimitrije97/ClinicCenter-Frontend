import { Component, OnInit } from '@angular/core';
import { ExaminationService } from 'src/app/services/examination.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-confirming-examinations',
  templateUrl: './confirming-examinations.component.html',
  styleUrls: ['./confirming-examinations.component.css']
})
export class ConfirmingExaminationsComponent implements OnInit {

  public listOfData = [];
  private user: any;

  constructor(private examinationService: ExaminationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.setupUser();
    this.setupData();
  }

  private setupData(): void {
    this.examinationService.getAllConfirmingExaminationsByPatient(this.user.id).subscribe(data => {
      this.listOfData = data;
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
    });
  }

  formatDate(date): String {
    return moment(date).format("L");
  }
}

