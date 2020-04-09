import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { GradeService } from 'src/app/services/grade.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-doctors-who-can-be-graded',
  templateUrl: './doctors-who-can-be-graded.component.html',
  styleUrls: ['./doctors-who-can-be-graded.component.css']
})
export class DoctorsWhoCanBeGradedComponent implements OnInit {

  validateForm: FormGroup;
  public listOfData = [];
  private user: any;
  public isVisible: boolean;
  public grade = null;

  constructor(private fb: FormBuilder, private gradeService: GradeService, private doctorService: DoctorService, private message: NzMessageService, private router: Router) { }

  ngOnInit(): void {
    this.setupUser();
    this.setupData();
  }

  private setupData(): void {
    this.gradeService.getAllDoctorsWhoCanBeGraded(this.user.id).subscribe(data => {
      this.listOfData = data;
    },
    error => {
      this.message.info(error.error.message);
      this.router.navigateByUrl(`dashboard`);
    });
    this.isVisible = false;
    this.validateForm = this.fb.group({
      grade: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern("^[1-5]*$")]]
    });
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  public getAvgGradeOfDoctor(id): void {
    this.doctorService.getAvgGrade(id).subscribe(data => {
       this.message.info(data.grade);
     },
     error => {
       this.message.info(error.error.message);
     });
   }

   public gradeDoctor(): void {
    this.isVisible = true;
   }

   public confirm(id): void {
    const body = {
      ...this.validateForm.value,
      patientId: this.user.id,
      doctorOrClinicId: id
    }
    console.log(body)
    this.gradeService.gradeDoctor(body).subscribe(data => {
      this.setupData();
      this.message.info('Uspešno ste ocenili lekara.');
    },
    error => {
      this.message.info(error.error.message);
    });
   }
}
