import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { DiagnosisService } from 'src/app/services/diagnosis.service';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css']
})
export class DiagnosisComponent implements OnInit {

  public listOfData = [];
  private user: any;

  constructor(private message: NzMessageService, private router: Router, private diagnosisService: DiagnosisService) { }

  ngOnInit(): void {
    this.setupUser();
    this.setupData();
  }

  private setupData(): void {
    if(this.user.userType === 'CLINIC_CENTER_ADMIN') {
      this.diagnosisService.getAllDiagnosis().subscribe(data => {
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
  }

  public delete(id): void {
    this.diagnosisService.deleteDiagnosis(id).subscribe(() => {
      this.message.info('Uspešno ste obrisali dijagnozu.');
      this.setupData();
    })
  }

}
