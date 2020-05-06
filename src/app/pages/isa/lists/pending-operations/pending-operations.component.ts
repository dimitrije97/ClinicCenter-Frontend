import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SuggestService } from 'src/app/services/suggest.service';
import { FilterService } from 'src/app/services/filter.service';
import { NzMessageService } from 'ng-zorro-antd';
import { OperationService } from 'src/app/services/operation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-operations',
  templateUrl: './pending-operations.component.html',
  styleUrls: ['./pending-operations.component.css']
})
export class PendingOperationsComponent implements OnInit {

  validateForm: FormGroup;

  public listOfData = [];
  private user: any;
  public isVisible: boolean;

  public examinationId: any;

  public listOfData2 = [];
  public isVisible2: boolean;

  public checked : boolean;
  public isVisible3: boolean;
  
  public emergencyRoomId: any = null;

  public name: any = '';
  public number: any = '';

  constructor(private suggestService: SuggestService, private filterService: FilterService, private message: NzMessageService, private operationService: OperationService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.setupUser();
    this.setupData();
    this.validateForm = this.fb.group({
      reason: [null, [Validators.required, Validators.minLength(13)]]
    });
  }

  private setupData(): void {
    this.operationService.getAllPendingOperationsByClinic(this.user.myClinic.id).subscribe(data => {
      this.listOfData = data;
    },
    error => {
      this.message.info(error.error.message);
      this.router.navigateByUrl(`dashboard`);
    });
    this.isVisible = false;
    this.isVisible2 = false;
    this.isVisible3 = false;
    this.checked = true;
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  chooseEmergencyRoom(id): void {
    this.examinationId = id;
    const filterObject = {
      examinationId: this.examinationId
    }
    this.filterService.getFilteredEmergencyRoomsOp(filterObject).subscribe(data => {
      this.listOfData2 = data;
      this.isVisible2 = true;
    },
    error => {
      this.message.info(error.error.message);
      this.isVisible3 = true;
    });
  }
  

  confirm(): void {
    if(this.isVisible2){
      const body = {
        examinationId: this.examinationId,
        emergencyRoomId: this.emergencyRoomId
      }
      console.log(body)
      this.operationService.approveOperation(body).subscribe(data => {
        this.setupData();
        this.message.info('Uspešno ste odobrili zahtev za operaciju.');
      },
      error => {
        this.message.info(error.error.message);
      });
    }else if(this.isVisible3){
      const body = {
        examinationId: this.examinationId
      }
      this.suggestService.suggestOp(body).subscribe(() => {
        this.setupData();
        this.message.info('Uspešno ste odobrili zahtev za operaciju.');
        // this.router.navigateByUrl('dashboard');
      })
    }

  }

  getReason(): void {
    this.isVisible = true;
    this.isVisible2 = false;
  }

  deny(id): void {
    const body = {
      examinationId: id,
      ...this.validateForm.value
    }
    console.log(body)
    this.operationService.denyOperation(body).subscribe(data => {
      this.setupData();
      this.message.info('Uspešno ste odbili zahtev za operaciju.');
    },
    error => {
      this.message.info(error.error.message);
    });
  }

  formatDate(date): String {
    return moment(date).format("L");
  }
}
