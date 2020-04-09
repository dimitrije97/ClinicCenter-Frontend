import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ClinicService } from 'src/app/services/clinic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GradeService } from 'src/app/services/grade.service';

@Component({
  selector: 'app-clinics-which-can-be-graded',
  templateUrl: './clinics-which-can-be-graded.component.html',
  styleUrls: ['./clinics-which-can-be-graded.component.css']
})
export class ClinicsWhichCanBeGradedComponent implements OnInit {

  public listOfData = [];
  private user: any;

  constructor(private message: NzMessageService, private gradeService: GradeService, private clinicService: ClinicService, private router: Router, private route: ActivatedRoute) { }

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
  }

  public getAvgGradeOfClinic(id): void {
   this.clinicService.getAvgGrade(id).subscribe(data => {
      this.message.info(data.grade);
    },
    error => {
      this.message.info(error.error.message);
    });
  }

  public grade(id): void {
    
  }
}
