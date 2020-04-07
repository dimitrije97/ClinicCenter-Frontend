import { Component, OnInit } from '@angular/core';
import { PotentialExaminationService } from 'src/app/services/potential-examination.service';
import * as moment from 'moment'

@Component({
  selector: 'app-potential-examinations',
  templateUrl: './potential-examinations.component.html',
  styleUrls: ['./potential-examinations.component.css']
})
export class PotentialExaminationsComponent implements OnInit {

  listOfData = [];
  private user: any;
  public isAdmin: boolean;
  public isPatient: boolean;

  constructor(private peService: PotentialExaminationService) { }

  ngOnInit() {
    this.setupUser();
    this.setupUserType();
    this.setupData();
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  public setupData(): void {
    this.peService.getAllPotentialExaminationsByClinic(this.user.myClinic.id).subscribe(data => {
      this.listOfData = data;
    })
  }

  private setupUserType(): void {
    if(this.user.userType === 'ADMIN') {
      this.isAdmin = true;
      this.isPatient = false;
    } else if(this.user.userType === 'PATIENT') {
      this.isPatient = true;
      this.isAdmin = false;
    }
  }

  delete(id): void {
    this.peService.deletePotentialExamination(id).subscribe(data => {
      this.setupData();
    },
    error => {
      const message = error.error.message;
      console.log(message)
    });
  }

  formatDate(date): String {
    return moment(date).format("L");
  }
}
