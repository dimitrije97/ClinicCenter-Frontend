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

  constructor(private message: NzMessageService, private clinicService: ClinicService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.setupData();
  }

  private setupData(): void {
    this.clinicService.getAllClinics().subscribe(data => {
      this.listOfData = data;
    });
  }

  public getAvgGradeOfClinic(id): void {
   this.clinicService.getAvgGrade(id).subscribe(data => {
      this.message.info(data.grade);
    },
    error => {
      const msg = error.error.message;
      console.log(msg)
    });
  }
}