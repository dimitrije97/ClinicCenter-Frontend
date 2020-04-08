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

  constructor(private message: NzMessageService, private doctorService: DoctorService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.setupUser();
    this.setupData();
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
    } else {
      
    }
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
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

}
