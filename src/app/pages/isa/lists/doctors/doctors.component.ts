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
  private id;
  private user: any;

  constructor(private doctorService: DoctorService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.setupUser();
    this.extractId();
    this.setupData();
  }

  private setupData(): void {
    if(this.user.userType === 'CLINIC_CENTER_ADMIN') {
      this.doctorService.getAllDoctors().subscribe(data => {
        this.listOfData = data;
      });
    } else {
      this.doctorService.getAllDoctorsByClinic(this.user.myClinic.id).subscribe(data => {
        this.listOfData = data;
      });
    }
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  } 

  profile(id) {
    this.router.navigateByUrl(`dashboard/profile/${id}/doctor`);
  }

  private extractId(): void {
    this.id = this.route.snapshot.params.id;
  }

  delete(id) {
    this.doctorService.deleteDoctor(id).subscribe(() => {
      this.setupData();
    })
  }

}
