import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ExaminationService } from 'src/app/services/examination.service';
import * as moment from 'moment';
import { ExaminationTypeService } from 'src/app/services/examination-type.service';

@Component({
  selector: 'app-new-examination-by-patient',
  templateUrl: './new-examination-by-patient.component.html',
  styleUrls: ['./new-examination-by-patient.component.css']
})
export class NewExaminationByPatientComponent implements OnInit {

  public time: Date | null = null;
  public date: Date = null;
  public user: any;
  patientId: null;
  examinationTypeId = null;
  public listOfData = [];
  public validateForm: FormGroup;
  
  constructor(private router: Router, private route: ActivatedRoute, private examinationTypeService:ExaminationTypeService, private examinationService: ExaminationService, private fb: FormBuilder) { }

  ngOnInit() {
    this.setupUser();
    this.setupData();
  }

  private setupData(): void {
    this.examinationTypeService.getAllExaminationTypes().subscribe(data => {
      this.listOfData = data;
    });
  }

  public setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  public onSchedule(): void {
    const body = {
      date: moment(this.date).format('L'),
      startAt: moment(this.time).format('HH:mm:ss'),
      patientId: this.user.id,
      examinationTypeId: this.examinationTypeId
      //fali doctorId

    }
    console.log(body)
    this.examinationService.createExaminationRequestAsPatient(body).subscribe(() => {
      
    })
  }

}
