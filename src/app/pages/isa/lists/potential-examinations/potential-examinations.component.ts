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

  constructor(private peService: PotentialExaminationService) { }

  ngOnInit() {
    this.setupUser();
    this.setupData();
  }

  private setupUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  public setupData(): void {
    this.peService.getAllPotentialExaminationsByClinic(this.user.myClinic.id).subscribe(data => {
      this.listOfData = data;
    })
  }

  delete(id): void {
    this.peService.deletePotentialExamination(id).subscribe(data => {
      this.setupData();
    })
  }

  formatDate(date): String {
    return moment(date).format("L");
  }

}
