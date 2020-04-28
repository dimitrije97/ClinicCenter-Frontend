import { Component, OnInit } from '@angular/core';
import { MedicalRecordService } from 'src/app/services/medical-record.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.css']
})
export class MedicalRecordComponent implements OnInit {

  public validateForm: FormGroup
  private user: any;
  private id: any;
  public isReadOnly: boolean;
  private medicalRecordId: any;
  public listOfData = [];
  public isEmpty: boolean;

  constructor(private reportService: ReportService, private mrService: MedicalRecordService, private fb: FormBuilder, private message: NzMessageService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.setupUser();
    this.validateForm = this.fb.group({
      patientEmail: [{value: null, disabled: this.isReadOnly }],
      patientName: [{value: null, disabled: this.isReadOnly }],
      patientSurname: [{value: null, disabled: this.isReadOnly }],
      height: [{value: null, disabled: this.isReadOnly }, [Validators.pattern("^[0-9]*$")]],
      weight: [{value: null, disabled: this.isReadOnly }, [Validators.pattern("^[0-9]*$")]],
      allergy: [{value: null, disabled: this.isReadOnly }],
      diopter: [{value: null, disabled: this.isReadOnly }]
    });
    this.extractId();
    this.setupData();
    this.getDetails();
  }

  private setupData(): void {
    this.validateForm = this.fb.group({
      patientEmail: [{value: null, disabled: this.isReadOnly }],
      patientName: [{value: null, disabled: this.isReadOnly }],
      patientSurname: [{value: null, disabled: this.isReadOnly }],
      height: [{value: null, disabled: this.isReadOnly }, [Validators.pattern("^[0-9]*$")]],
      weight: [{value: null, disabled: this.isReadOnly }, [Validators.pattern("^[0-9]*$")]],
      allergy: [{value: null, disabled: this.isReadOnly }],
      diopter: [{value: null, disabled: this.isReadOnly }]
    });
  }

  private getDetails(): void {
    this.mrService.getMedicalRecordByPatient(this.id).subscribe(data => {
      this.validateForm = this.fb.group({
        patientEmail: [data.patientEmail],
        patientName: [data.patientName],
        patientSurname: [data.patientSurname],
        height: [data.height, [Validators.pattern("^[0-9]*$")]],
        weight: [data.weight, [Validators.pattern("^[0-9]*$")]],
        allergy: [data.allergy],
        diopter: [data.diopter]
      });
      this.medicalRecordId = data.id;
      this.reportService.getAllReportsByMedicalRecord(this.medicalRecordId).subscribe(data => {
        this.listOfData = data;
      })
      console.log(this.listOfData.length);
      if(this.listOfData.length){
        this.isEmpty = true;
      }else{
        this.isEmpty = false;
      }
    },
    error => {
      this.message.info(error.error.message);
      this.router.navigateByUrl('dashboard');
    });
  }

  public setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.user.userType === 'PATIENT'){
      this.isReadOnly = true;
    }else{
      this.isReadOnly = false;
    }
  }

  private extractId(): void {
    this.id = this.route.snapshot.params.id;
  }

  public submitForm(): void {
    const body = {
      patientEmail: this.validateForm.value.patientEmail,
      weight: this.validateForm.value.weight,
      height: this.validateForm.value.height,
      allergy: this.validateForm.value.allergy,
      diopter: this.validateForm.value.diopter,
      doctorId: this.user.id,
      currentTime: moment().format('HH:mm:ss')
    }
    this.mrService.updateMedicalRecord(body).subscribe(data => {
      this.message.info('Uspešno ste izmenili zdravstveni karton.');
      this.router.navigateByUrl('dashboard');
    }, error => {
      this.message.info(error.error.message);
      this.router.navigateByUrl('dashboard');
    });
  }

  public updateReport(id): void {
    this.router.navigateByUrl(`dashboard/${id}/report`);
  }
}
