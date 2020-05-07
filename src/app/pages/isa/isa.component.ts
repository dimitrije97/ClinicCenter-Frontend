import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NzMessageService } from 'ng-zorro-antd';
import { ClinicService } from 'src/app/services/clinic.service';

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

  constructor(private router: Router, private clinicSevice: ClinicService, private message: NzMessageService) { }

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
  public pendingOperationsByClinic(): void {
    this.router.navigateByUrl(`dashboard/pending-operations/${this.user.myClinic.id}/clinic`);
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
    this.router.navigateByUrl(`dashboard/clinics-income`);
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
  public clinicsAvgGrade(): void {
    this.clinicSevice.getAvgGrade(this.user.myClinic.id).subscribe(data => {
      this.message.info('Prosečna ocena klinike je '+data.grade+'.');
    },
    error => {
      this.message.info(error.error.message);
    });
  }

  //admin
  public scheduledOperations(): void {
    this.router.navigateByUrl('dashboard/future-operations');
  }

  //admin
  public scheduledExaminations(): void {
    this.router.navigateByUrl('dashboard/future-examinations');
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
    this.router.navigateByUrl(`dashboard/calendar`);
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
  public futureOperations(): void {
    this.router.navigateByUrl(`dashboard/future-operations`);
  }

  //patient
  public examinationsHistory(): void {
    this.router.navigateByUrl(`dashboard/examinations-history`);
  }

  //patient
  public operationsHistory(): void {
    this.router.navigateByUrl(`dashboard/operations-history`);
  }

  //patient
  public gradeDoctors(): void {
    this.router.navigateByUrl(`dashboard/doctors-who-can-be-graded`);
  }

  //patient
  public gradeClinics(): void {
    this.router.navigateByUrl(`dashboard/clinics-which-can-be-graded`);
  }

  //patient
  public medicalRecordByPatient(): void {
    this.router.navigateByUrl(`dashboard/medical-record/${this.user.id}/patient`);
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

  //ccadmin
  public admins(): void {
    this.router.navigateByUrl('dashboard/admins');
  }

  //ccadmin
  public doctors(): void {
    this.router.navigateByUrl('dashboard/doctors');
  }

  //ccadmin
  public nurses(): void {
    this.router.navigateByUrl('dashboard/nurses');
  }

  //ccadmin
  public medicines(): void {
    this.router.navigateByUrl('dashboard/medicines');
  }

  //ccadmin
  public diagnosis(): void {
    this.router.navigateByUrl('dashboard/diagnosis');
  }

  //ccadmin
  public allPatients(): void {
    this.router.navigateByUrl('dashboard/patients');
  }

  //ccadmin
  public createMedicalRecord(): void {
    this.router.navigateByUrl('dashboard/create-medical-record');
  }

  //doctor
  public createRecipe(): void {
    this.router.navigateByUrl('dashboard/create-recipe');
  }

  //doctor
  public certified(): void {
    this.router.navigateByUrl('dashboard/certified-recipes');
  }

  //doctor
  public nonCertified(): void {
    this.router.navigateByUrl('dashboard/non-certified-recipes');
  }
}
