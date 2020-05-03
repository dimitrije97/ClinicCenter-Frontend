import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  public listOfData = [];
  private id;
  private user: any;

  public isCCAdmin: boolean;

  public isNurse: boolean;

  public firstName: any = '';
  public lastName: any = '';
  public ssn: any = '';

  constructor(private message: NzMessageService, private patientService: PatientService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.setupUser();
    this.extractId();
    this.setupData();
  }

  private setupData(): void {
    if(this.user.userType === 'CLINIC_CENTER_ADMIN') {
      this.patientService.getAllPatients().subscribe(data => {
        this.listOfData = data;
        this.isCCAdmin = true;
        this.isNurse = false;
      },
      error => {
        this.message.info(error.error.message);
      });
    } else {
      this.patientService.getAllPatientsByClinic(this.user.myClinic.id).subscribe(data => {
        this.listOfData = data;
        this.isCCAdmin = false;
        if(this.user.userType === 'NURSE'){
          this.isNurse = true;
        }else{
          this.isNurse = false;
        }
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

  public profile(id): void {
    this.router.navigateByUrl(`dashboard/profile/${id}/patient`);
  }

  private extractId(): void {
    this.id = this.route.snapshot.params.id;
  }
  
  public scheduleExamination(id): void {
    this.router.navigateByUrl(`dashboard/create-examination-request/${id}/patient`);
  }

  public report(id): void {
    this.router.navigateByUrl(`dashboard/create-report/${id}/patient`);
  }

  public search(): void {
    const filteredObject = {
      firstName: this.firstName,
      lastName: this.lastName,
      ssn: this.ssn
    }
    this.patientService.getAllPatientsByFirstNameAndLastNameAndSsn(filteredObject, this.id).subscribe(data => {
      this.listOfData = data;
    })
  }
}
