import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ExaminationService } from 'src/app/services/examination.service';
import * as moment from 'moment';
import { ExaminationTypeService } from 'src/app/services/examination-type.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-new-examination-by-patient',
  templateUrl: './new-examination-by-patient.component.html',
  styleUrls: ['./new-examination-by-patient.component.css']
})
export class NewExaminationByPatientComponent implements OnInit {

  public date: Date | null = null;
  private user: any;
  public examinationTypeId: any;
  public listOfData = [];
  public validateForm: FormGroup;

  public isVisible: boolean = false;
  public clinicId: any;
  public listOfData2 = [];
  public time: any;

  
  constructor(private filterService: FilterService, private router: Router, private route: ActivatedRoute, private examinationTypeService:ExaminationTypeService, private examinationService: ExaminationService, private fb: FormBuilder) { }

  ngOnInit() {
    this.setupUser();
    this.setupData();
  }

  private setupData(): void {
    this.examinationTypeService.getAllExaminationTypes().subscribe(data => {
      this.listOfData = data;
    });
  }

  public setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  public showFilteredClinics(): void {
    const body = {
      examinationTypeId: this.examinationTypeId,
      date: moment(this.date).format('YYYY/MM/DD')
    }
    console.log(body)
    this.filterService.getFilteredClinics(body).subscribe(data => {
      this.isVisible = true;
      this.listOfData2 = data;
    },
    error => {
      const message = error.error.message;
      console.log(message)
    });
  }

  public showFilteredDoctors(): void {
    const body = {
      date: moment(this.date).format('L'),
      examinationTypeId: this.examinationTypeId,
      startAt: moment(this.time).format("HH:mm:ss"),
      clinicId: this.clinicId
    }
    console.log(body)
    // this.filterService.get(body).subscribe(data => {
    //   console.log(data);
    //   this.isVisible = true;
    // },
    // error => {
    //   const message = error.error.message;
    //   console.log(message)
    // });
  }

}
