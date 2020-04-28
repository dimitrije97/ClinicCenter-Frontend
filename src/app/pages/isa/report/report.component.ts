import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReportService } from 'src/app/services/report.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  private user: any;
  public validateForm: FormGroup;
  private id: any;

  constructor(private route: ActivatedRoute, private reportSercice: ReportService, private message: NzMessageService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.setupUser();
    this.extractId();
    this.setupData();
    this.getDetails();
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  private setupData(): void {
    this.validateForm = this.fb.group({
      medicineName: [{value: null, disabled: true }],
      diagnosisName: [{value: null, disabled: true }],
      description: [{value: null }]
    });
  }

  private getDetails(): void {
    this.reportSercice.getReport(this.id).subscribe(data => {
      this.validateForm = this.fb.group({
        medicineName: [data.medicineName],
        diagnosisName: [data.diagnosisName],
        description: [data.description]
      });
  });
}

  private extractId(): void {
    this.id = this.route.snapshot.params.id;
  }

  public submitForm(): void {
    const body = {
      description: this.validateForm.value.description,
      doctorId: this.user.id,
      reportId: this.id
    }
    this.reportSercice.updateReport(body).subscribe(data => {
      this.message.info('Uspešno ste izmenili izveštaj o pregledu.');
      this.router.navigateByUrl('dashboard');
    }, error => {
      this.message.info(error.error.message);
      this.router.navigateByUrl('dashboard');
    });
  }
}
