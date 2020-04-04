import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private router: Router) { }

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

  }

  //admin
  public pendingVacationsByClinic(): void {

  }

  //admin
  public potentialExaminationsByClinic(): void {

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
  public createPotentialExamination(): void {
    
  }

  //admin
  public doctorsByClinic(): void {
    this.router.navigateByUrl(`dashboard/doctors/${this.user.myClinic.id}/clinic`);
  }

  //admin
  public nursesByClinic(): void {
    
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
}
