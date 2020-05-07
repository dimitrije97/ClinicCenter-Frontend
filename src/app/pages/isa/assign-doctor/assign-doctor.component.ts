import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { DoctorService } from 'src/app/services/doctor.service';
import { OperationService } from 'src/app/services/operation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assign-doctor',
  templateUrl: './assign-doctor.component.html',
  styleUrls: ['./assign-doctor.component.css']
})
export class AssignDoctorComponent implements OnInit {

  public listOfData = [];
  public doctorId: any = null;

  private user: any;
  private id: any;

  constructor(private message: NzMessageService, private doctorService: DoctorService, private operationService: OperationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.setupUser();
    this.extractId();
    this.setupData();
  }

  public setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  private extractId(): void {
    this.id = this.route.snapshot.params.id;
  }

  private setupData(): void {
    this.doctorService.getAllDoctorsByClinic(this.user.myClinic.id).subscribe(data => {
      this.listOfData = data;
    })
  }

  public assign(): void {
    const body = {
      examinationId: this.id,
      doctorId: this.doctorId
    }
    this.operationService.assignDoctor(body).subscribe(data => {
      this.message.info('Uspešno ste dodali još jednog lekara.');
    },
    error => {
      this.message.info(error.error.message);
    });
  }

  public doctorDN(name, surname): String {
    return name+' '+surname;
  }
}