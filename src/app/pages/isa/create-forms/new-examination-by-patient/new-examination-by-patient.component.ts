import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ExaminationService } from 'src/app/services/examination.service';
import * as moment from 'moment';
import { ExaminationTypeService } from 'src/app/services/examination-type.service';
import { FilterService } from 'src/app/services/filter.service';
import { ClinicService } from 'src/app/services/clinic.service';
import { NzMessageService } from 'ng-zorro-antd';
import { DoctorService } from 'src/app/services/doctor.service';

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
  public isVisible: boolean;
  
  public isVisible2: boolean;
  public clinicId: any;
  public listOfData2 = [];
  public time: Date | null = null;

  public listOfData3 = [];
  public isVisible3: boolean;
  public doctorId: any;

  public isVisible4: boolean;

  private clinic: String;

  private doctor: String;

  public firstName: any = '';
  public lastName: any = '';
  
  constructor(private message: NzMessageService, private doctorService: DoctorService, private clinicService: ClinicService, private filterService: FilterService, private router: Router, private route: ActivatedRoute, private examinationTypeService:ExaminationTypeService, private examinationService: ExaminationService, private fb: FormBuilder) { }

  ngOnInit() {
    this.setupUser();
    this.setupData();
    this.isVisible = false;
    this.isVisible2 = false;
    this.isVisible3 = false;
    this.isVisible4 = false;
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
    const filterObject = {
      examinationTypeId: this.examinationTypeId,
      date: moment(this.date).format('YYYY/MM/DD')
    }
    this.filterService.getFilteredClinics(filterObject).subscribe(data => {
      this.isVisible = true;
      this.listOfData2 = data;
      
      this.isVisible2 = false;
      this.isVisible3 = false;
      this.isVisible4 = false;
    },
    error => {
      this.message.info(error.error.message);
    });
  }

  public chooseClinic(id, name): void {
    this.isVisible2 = true;
    this.clinicId = id;

    this.isVisible3 = false;
    this.isVisible4 = false;

    this.clinic = name;
  }

  public chooseDoctor(id, name, surname): void {
    this.isVisible4 = true;
    this.doctorId = id;

    this.doctor = name + ' ' + surname;
  }

  public showFilteredDoctors(): void {
    const filterObject = {
      date: moment(this.date).format('YYYY/MM/DD'),
      examinationTypeId: this.examinationTypeId,
      startAt: moment(this.time).format("HH:mm:ss"),
      clinicId: this.clinicId
    }
    this.filterService.getFilteredDoctors(filterObject).subscribe(data => {
      this.listOfData3 = data;
      this.isVisible3 = true;
      this.isVisible = false;
      this.isVisible2 = false;

      this.isVisible4 = false;
    },
    error => {
      this.message.info(error.error.message);
    });
  }

  public getAvgGradeOfClinic(id): void {
    this.clinicService.getAvgGrade(id).subscribe(data => {
       this.message.info(data.grade);
     },
     error => {
       this.message.info(error.error.message);
     });
   }

   public getAvgGradeOfDoctor(id): void {
    this.doctorService.getAvgGrade(id).subscribe(data => {
       this.message.info(data.grade);
     },
     error => {
       this.message.info(error.error.message);
     });
   }

   public sendExaminationRequest(): void {
    const body = {
      date: this.date,
      doctorId: this.doctorId,
      startAt: moment(this.time).format("HH:mm:ss"),
      patientId: this.user.id,
      clinic : this.clinic,
      doctor: this.doctor
    }
    localStorage.setItem('examinationData', JSON.stringify(body));
    this.router.navigateByUrl('dashboard/examination-redirect');
    
   }

   public search(): void {
     const filteredObject = {
      date: moment(this.date).format('YYYY/MM/DD'),
      examinationTypeId: this.examinationTypeId,
      startAt: moment(this.time).format("HH:mm:ss"),
      clinicId: this.clinicId,
      firstName: this.firstName,
      lastName: this.lastName
     }
     this.filterService.getFilteredDoctorsByFirstNameAndLastName(filteredObject).subscribe(data => {
      this.listOfData3 = data;
      this.isVisible3 = true;
      this.isVisible = false;
      this.isVisible2 = false;

      this.isVisible4 = false;
     });
   }
}
