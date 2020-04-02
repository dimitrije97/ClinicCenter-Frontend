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

  public clearStorage(): void {
    localStorage.clear();
    this.router.navigateByUrl('auth/login');
  }

  public onUpdatePassword(): void {
    this.router.navigateByUrl('dashboard/update-password');
  }

  public onPatients(): void {
    this.router.navigateByUrl('dashboard/patients');
  }
}
