import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { MedicalRecordService } from 'src/app/services/medical-record.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-new-medical-record',
  templateUrl: './new-medical-record.component.html',
  styleUrls: ['./new-medical-record.component.css']
})
export class NewMedicalRecordComponent implements OnInit {

  public validateForm: FormGroup;
  public listOfData = [];
  public patientId = null

  constructor(private message: NzMessageService, private mrService: MedicalRecordService,private patientService: PatientService,  private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setupForm();
    this.setupData();
  }

  private setupForm(): void {
    this.validateForm = this.fb.group({
      height: [null, [Validators.pattern("^[0-9]*$")]],
      weight: [null, [Validators.pattern("^[0-9]*$")]],
      allergy: [null],
      diopter: [null]
    });
  }

  private setupData(): void {
    this.patientService.getAllPatients().subscribe(data => {
      this.listOfData = data;
    },
    error => {
      this.message.info(error.error.message);
    });
  }
  
  public submitForm(): void {
    const body = {
      patientId: this.patientId,
      ...this.validateForm.value
    }
    this.mrService.createMedicalRecord(body).subscribe(() => {
      this.message.info('Uspešno ste kreirali zdravstveni karton');
      this.router.navigateByUrl('dashboard');
    },
    error => {
      this.message.info(error.error.message);
    });
  }

  public patientDN(name, surname): String {
    return name+' '+surname;
  }
}
