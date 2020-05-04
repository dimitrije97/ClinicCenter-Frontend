import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  public listOfData = [];
  private user: any;
  private id: any;
  public isPatient: boolean;

  public firstName: any = '';
  public lastName: any = '';
  public name: any = '';

  constructor(private message: NzMessageService, private doctorService: DoctorService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.setupUser();
    this.extractId();
    this.setupData();
  }

  private extractId(): void {
    this.id = this.route.snapshot.params.id;
  }

  private setupData(): void {
    if(this.user.userType === 'ADMIN') {
      this.doctorService.getAllDoctorsByClinic(this.user.myClinic.id).subscribe(data => {
        this.listOfData = data;
      },
      error => {
        this.message.info(error.error.message);
        this.router.navigateByUrl(`dashboard`);
      });
    } else if(this.user.userType === 'CLINIC_CENTER_ADMIN'){
      this.doctorService.getAllDoctors().subscribe(data => {
        this.listOfData = data;
      },
      error => {
        this.message.info(error.error.message);
        this.router.navigateByUrl(`dashboard`);
      });
    } else if(this.user.userType === 'PATIENT'){
      this.doctorService.getAllDoctorsByClinic(this.id).subscribe(data => {
        this.listOfData = data;
      },
      error => {
        this.message.info(error.error.message);
        this.router.navigateByUrl(`dashboard`);
      });
    }
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.user.userType === 'PATIENT'){
      this.isPatient = true;
    }else{
      this.isPatient = false;
    }
  } 

  profile(id) {
    this.router.navigateByUrl(`dashboard/profile/${id}/doctor`);
  }

  delete(id) {
    this.doctorService.deleteDoctor(id).subscribe(() => {
      this.setupData();
      this.message.info('Uspešno ste obrisali lekara.');
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

   public search(): void {
     const filteredObject = {
       firstName: this.firstName,
       lastName: this.lastName,
       name: this.name
     }
     this.doctorService.getAllDoctorsByClinicByFirstNameAndLastNameAndName(filteredObject, this.id).subscribe(data => {
       this.listOfData = data;
     });
   }
}
