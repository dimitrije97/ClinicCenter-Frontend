import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IncomeService } from 'src/app/services/income.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-isa',
  templateUrl: './isa.component.html',
  styleUrls: ['./isa.component.css']
})
export class IsaComponent implements OnInit {

  public isAdmin: boolean;
  public isCCAdmin: boolean;
  public isDoctor: boolean;
  public isNurse: boolean;
  public isPatient: boolean;
  private user: any;

  constructor(private router: Router, private incomeService: IncomeService, private message: NzMessageService) { }

  ngOnInit(): void {
    this.setupUser();
    this.setupUserType();
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  } 

  private setupUserType(): void {
    this.isAdmin = false;
    this.isPatient = false;
    this.isDoctor = false;
    this.isNurse = false;
    this.isCCAdmin = false;
    if(this.user.userType === 'PATIENT'){
      this.isPatient = true;
    }else if(this.user.userType === 'ADMIN'){
      this.isAdmin = true;
    }else if(this.user.userType === 'CLINIC_CENTER_ADMIN'){
      this.isCCAdmin = true;
    }else if(this.user.userType === 'DOCTOR'){
      this.isDoctor = true;
    }else if(this.user.userType === 'NURSE'){
      this.isNurse = true;
    }
  }

  //all users
  public clearStorage(): void {
    localStorage.clear();
    this.router.navigateByUrl('auth/login');
  }
  
  //all users
  public updatePassword(): void {
    this.router.navigateByUrl('dashboard/update-password');
  }

  //admin, doctor and nurse
  public clinicProfile(): void {
    this.router.navigateByUrl(`dashboard/profile/${this.user.myClinic.id}/clinic`);
  }

  //admin
  public pendingExaminationsByClinic(): void {
    this.router.navigateByUrl(`dashboard/pending-examinations/${this.user.myClinic.id}/clinic`);
  }

  //admin
  public pendingVacationsByClinic(): void {
    this.router.navigateByUrl(`dashboard/pending-vacations/${this.user.id}/clinic`);
  }

  //admin
  public potentialExaminationsByClinic(): void {
    this.router.navigateByUrl(`dashboard/potential-examinations/${this.user.myClinic.id}/clinic`);
  }

  //admin
  public emergencyRoomsByClinic(): void {
    this.router.navigateByUrl(`dashboard/emergency-rooms/${this.user.myClinic.id}/clinic`);
  }

  //admin
  public examinationTypesByClinic(): void {
    this.router.navigateByUrl(`dashboard/examination-types/${this.user.myClinic.id}/clinic`);
  }

  //admin
  public reportByClinic(): void {

  }

  //admin
  public doctorsByClinic(): void {
    this.router.navigateByUrl(`dashboard/doctors/${this.user.myClinic.id}/clinic`);
  }

  //admin
  public nursesByClinic(): void {
    this.router.navigateByUrl(`dashboard/nurses/${this.user.myClinic.id}/clinic`);
  }

  //admin
  public createDoctor(): void {
    this.router.navigateByUrl(`dashboard/create-doctor`);
  }

  //admin
  public createNurse(): void {
    this.router.navigateByUrl(`dashboard/create-nurse`);
  }

  //admin
  public createEmergencyRoom(): void {
    this.router.navigateByUrl(`dashboard/create-emergency-room`);
  }

  //admin
  public createExaminationType(): void {
    this.router.navigateByUrl(`dashboard/create-examination-type`);
  }

  //admin
  public createPotentialExamination(): void {
    this.router.navigateByUrl(`dashboard/create-potential-examination`);
  }

  //admin
  public clinicsIncome(): void {
    this.incomeService.getClinicsIncome(this.user.myClinic.id).subscribe(data => {
      this.message.info('Klinika je do sada imala '+data.examinationsNumber+' pregleda i zaradila '+data.income+' dinara.');
    },
    error => {
      this.message.info(error.error.message);
    });
  }

  //doctor
  public patients(): void {
    this.router.navigateByUrl(`dashboard/patients/${this.user.myClinic.id}/clinic`);
  }

  //doctor
  public vacation(): void {
    this.router.navigateByUrl(`dashboard/create-vacation-request`);
  }

  public schedule(): void {
    this.router.navigateByUrl(`dashboard/doctor-calendar`);
  }

  //patient
  public scheduleExaminations(): void {
    this.router.navigateByUrl(`dashboard/create-examination-request`);
  }

  //patient
  public clinics(): void {
    this.router.navigateByUrl(`dashboard/clinics`);
  }

  //patient
  public choosePotential(): void {
    this.router.navigateByUrl(`dashboard/potential-examinations`);
  }

  //patient
  public confirmExaminations(): void {
    this.router.navigateByUrl(`dashboard/confirming-examinations`);
  }

  //patient
  public futureExaminations(): void {
    this.router.navigateByUrl(`dashboard/future-examinations`);
  }

  //patient
  public examinationHistory(): void {
    this.router.navigateByUrl(`dashboard/examinations-history`);
  }

  //patient
  public gradeDoctors(): void {
    this.router.navigateByUrl(`dashboard/doctors-who-can-be-graded`);
  }

  //patient
  public gradeClinics(): void {
    this.router.navigateByUrl(`dashboard/clinics-which-can-be-graded`);
  }

  //ccadmin
  public registrationRequests(): void {
    this.router.navigateByUrl(`dashboard/registration-requests`);
  }

  //ccadmin
  public createClinic(): void {
    this.router.navigateByUrl('dashboard/create-clinic');
  }

  //ccadmin
  public createAdmin(): void {
    this.router.navigateByUrl('dashboard/create-admin');
  }

  //ccadmin
  public createMedicine(): void {
    this.router.navigateByUrl('dashboard/create-medicine');
  }

  //ccadmin
  public createDiagnosis(): void {
    this.router.navigateByUrl('dashboard/create-diagnosis');
  }
}
