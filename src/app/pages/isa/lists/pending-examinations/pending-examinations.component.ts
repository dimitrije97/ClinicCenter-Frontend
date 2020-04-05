import { Component, OnInit } from '@angular/core';
import { ExaminationService } from 'src/app/services/examination.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pending-examinations',
  templateUrl: './pending-examinations.component.html',
  styleUrls: ['./pending-examinations.component.css']
})
export class PendingExaminationsComponent implements OnInit {

  validateForm: FormGroup;

  public listOfData = [];
  private user: any;
  public isVisible: boolean;

  constructor(private examinationService: ExaminationService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.setupUser();
    this.setupData();
    this.validateForm = this.fb.group({
      reason: [null, [Validators.required, Validators.minLength(13)]]
    });
  }

  private setupData(): void {
    this.examinationService.getAllPendingExaminationsByClinic(this.user.myClinic.id).subscribe(data => {
      this.listOfData = data;
    });
    this.isVisible = false;
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  } 

  confirm(id): void {
    const body = {
      examinationId: id
    }
    this.examinationService.confirmExamination(body).subscribe(data => {
      this.setupData();
    });
  }

  getReason(): void {
    this.isVisible = true;
  }

  deny(id): void {
    const body = {
      examinationId: id,
      ...this.validateForm.value
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
