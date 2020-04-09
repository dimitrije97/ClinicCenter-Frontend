import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ClinicService } from 'src/app/services/clinic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GradeService } from 'src/app/services/grade.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-clinics-which-can-be-graded',
  templateUrl: './clinics-which-can-be-graded.component.html',
  styleUrls: ['./clinics-which-can-be-graded.component.css']
})
export class ClinicsWhichCanBeGradedComponent implements OnInit {

  validateForm: FormGroup;
  public listOfData = [];
  private user: any;
  public isVisible: boolean;
  public grade = null;

  constructor(private fb: FormBuilder,private message: NzMessageService, private gradeService: GradeService, private clinicService: ClinicService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.setupUser();
    this.setupData();
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  private setupData(): void {
    this.gradeService.getAllClinicsWhichCanBeGraded(this.user.id).subscribe(data => {
      this.listOfData = data;
      console.log(data);
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

  public getAvgGradeOfClinic(id): void {
   this.clinicService.getAvgGrade(id).subscribe(data => {
      this.message.info(data.grade);
    },
    error => {
      this.message.info(error.error.message);
    });
  }

  public gradeClinic(): void {
    this.isVisible = true;
  }

  public confirm(id): void {
    const body = {
      ...this.validateForm.value,
      patientId: this.user.id,
      doctorOrClinicId: id
    }
    console.log(body)
    this.gradeService.gradeClinic(body).subscribe(data => {
      this.setupData();
      this.message.info('Uspešno ste ocenili kliniku.');
    },
    error => {
      this.message.info(error.error.message);
    });
   }
}
