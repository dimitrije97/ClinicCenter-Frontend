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

  constructor(private message: NzMessageService, private operationService: OperationService, private router: Router) { }

  ngOnInit() {
    this.setupUser();
    this.setupUserType();
    this.setupData();
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
    }
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  } 

  private setupUserType(): void {
    if(this.user.userType === 'PATIENT'){
      this.isPatient = true;
      this.isDoctor = false;
    }else if(this.user.userType === 'DOCTOR'){
      this.isDoctor = true;
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

  formatDate(date): String {
    return moment(date).format("L");
  }

}
