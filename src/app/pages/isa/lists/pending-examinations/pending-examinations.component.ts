import { Component, OnInit } from '@angular/core';
import { ExaminationService } from 'src/app/services/examination.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { FilterService } from 'src/app/services/filter.service';
import { SuggestService } from 'src/app/services/suggest.service';

@Component({
  selector: 'app-pending-examinations',
  templateUrl: './pending-examinations.component.html',
  styleUrls: ['./pending-examinations.component.css']
})
export class PendingExaminationsComponent implements OnInit {

  validateForm: FormGroup;

  public listOfData = [];
  private user: any;
  public isVisible: boolean;

  public examinationId: any;

  public listOfData2 = [];
  public isVisible2: boolean;

  public checked : boolean;
  public isVisible3: boolean;
  public isVisible4: boolean;
  
  public emergencyRoomId: any = null;

  public name: any = '';
  public number: any = '';

  constructor(private suggestService: SuggestService, private filterService: FilterService, private message: NzMessageService, private examinationService: ExaminationService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.setupUser();
    this.setupData();
    this.validateForm = this.fb.group({
      reason: [null, [Validators.required, Validators.minLength(13)]]
    });
  }

  private setupData(): void {
    this.examinationService.getAllPendingExaminationsByClinic(this.user.myClinic.id).subscribe(data => {
      this.listOfData = data;
    },
    error => {
      this.message.info(error.error.message);
      this.router.navigateByUrl(`dashboard`);
    });
    this.isVisible = false;
    this.isVisible2 = false;
    this.isVisible3 = false;
    this.isVisible4 = false;
    this.checked = true;
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  
  chooseEmergencyRoom(id): void {
    this.examinationId = id;
    const filterObject = {
      examinationId: id
    }
    this.filterService.getFilteredEmergencyRooms(filterObject).subscribe(data => {
      this.listOfData2 = data;
      this.isVisible2 = true;
    },
    error => {
      this.message.info(error.error.message);
      this.isVisible3 = true;
      this.isVisible4 = true;
    });
    
  }

  confirm(): void {
    if(this.isVisible2){
      const body = {
        examinationId: this.examinationId,
        emergencyRoomId: this.emergencyRoomId
      }
      console.log(body)
      this.examinationService.confirmExamination(body).subscribe(data => {
        this.setupData();
        this.message.info('Uspešno ste odobrili zahtev za pregled.');
      },
      error => {
        this.message.info(error.error.message);
      });
    }else if(this.isVisible3){
      const body = {
        examinationId: this.examinationId
      }
      this.suggestService.suggest(body).subscribe(() => {
        this.setupData();
        this.message.info('Uspešno ste odobrili zahtev za pregled.');
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
    this.examinationService.denyExamination(body).subscribe(data => {
      this.setupData();
      this.message.info('Uspešno ste odbili zahtev za pregled.');
    },
    error => {
      this.message.info(error.error.message);
    });
  }

  choose(id): void {
    this.emergencyRoomId = id;
    this.isVisible4 = true;
  }

  search(): void {
    const filteredObject = {
      examinationId: this.examinationId,
      name: this.name,
      number: this.number
    }
    this.filterService.getFilteredEmergencyRoomsByNameAndNumber(filteredObject).subscribe(data => {
      this.listOfData2 = data;
    })
  }

  formatDate(date): String {
    return moment(date).format("L");
  }
}
