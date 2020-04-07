import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  public listOfData = [];
  private user: any;

  constructor(private doctorService: DoctorService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.setupUser();
    this.setupData();
  }

  private setupData(): void {
    if(this.user.userType === 'ADMIN') {
      this.doctorService.getAllDoctorsByClinic(this.user.myClinic.id).subscribe(data => {
        this.listOfData = data;
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
    },
    error => {
      const message = error.error.message;
      console.log(message)
    });
  }

}
