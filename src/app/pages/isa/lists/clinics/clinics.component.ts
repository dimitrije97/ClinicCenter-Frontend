import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClinicService } from 'src/app/services/clinic.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.css']
})
export class ClinicsComponent implements OnInit {

  public listOfData = [];

  private user: any;
  public isCCAdmin: boolean;

  constructor(private message: NzMessageService, private clinicService: ClinicService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.setupUser();
    this.setupUserType();
    this.setupData();
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.isCCAdmin = false;
  }

  private setupUserType(): void {
    if(this.user.userType === 'CLINIC_CENTER_ADMIN'){
      this.isCCAdmin = true;
    }
  }

  private setupData(): void {
    this.clinicService.getAllClinics().subscribe(data => {
      this.listOfData = data;
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

  public delete(id): void {
    this.clinicService.deleteClinic(id).subscribe(() => {
      this.message.info('Uspešno ste obrisali kliniku.');
      this.setupData();
    },
    error => {
      this.message.info(error.error.message);
    });
  }
}