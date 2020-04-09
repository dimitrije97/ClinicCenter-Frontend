import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { GradeService } from 'src/app/services/grade.service';

@Component({
  selector: 'app-doctors-who-can-be-graded',
  templateUrl: './doctors-who-can-be-graded.component.html',
  styleUrls: ['./doctors-who-can-be-graded.component.css']
})
export class DoctorsWhoCanBeGradedComponent implements OnInit {

  public listOfData = [];
  private user: any;

  constructor(private gradeService: GradeService, private doctorService: DoctorService, private message: NzMessageService, private router: Router) { }

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

   public grade(id): void {
     
   }
}
