import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { OperationService } from 'src/app/services/operation.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-future-operations',
  templateUrl: './future-operations.component.html',
  styleUrls: ['./future-operations.component.css']
})
export class FutureOperationsComponent implements OnInit {

  public listOfData = [];
  private user: any;
  private isDoctor: boolean;
  private isPatient: boolean;
  public isAdmin: boolean;
  public isVisible: boolean;

  constructor(private message: NzMessageService, private operationService: OperationService, private router: Router) { }

  ngOnInit() {
    this.setupUser();
    this.setupUserType();
    this.setupData();
    this.isVisible = false;
  }

  private setupData(): void {
    if(this.isPatient){
      this.operationService.getAllFutureOperationsByPatient(this.user.id).subscribe(data => {
        this.listOfData = data;
      },
      error => {
        this.message.info(error.error.message);
        this.router.navigateByUrl(`dashboard`);
      });
    }else if(this.isDoctor){
      this.operationService.getAllFutureOperationsByDoctor(this.user.id).subscribe(data => {
        this.listOfData = data;
      },
      error => {
        this.message.info(error.error.message);
        this.router.navigateByUrl(`dashboard`);
      });
    }else if(this.isAdmin){
      this.operationService.getAllFutureOperationsByAdmin(this.user.myClinic.id).subscribe(data => {
        this.listOfData = data;
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

  private setupUserType(): void {
    if(this.user.userType === 'PATIENT'){
      this.isPatient = true;
      this.isDoctor = false;
      this.isAdmin = false;
    }else if(this.user.userType === 'DOCTOR'){
      this.isDoctor = true;
      this.isPatient = false;
      this.isAdmin = false;
    }else if(this.user.userType === 'ADMIN'){
      this.isAdmin = true;
      this.isDoctor = false;
      this.isPatient = false;
    }
  }

  public cancel(id): void {
    this.operationService.cancelFutureOperation(id).subscribe(data => {
      this.setupData();
      this.message.info('Uspešno ste otkazali operaciju.');
    },
    error => {
      this.message.info(error.error.message);
    });
  }

  public assign(id): void {
    this.router.navigateByUrl(`dashboard/assign-doctor/${id}/operation`);
  }

  formatDate(date): String {
    return moment(date).format("L");
  }

}
