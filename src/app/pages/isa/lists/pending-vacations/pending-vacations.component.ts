import { Component, OnInit } from '@angular/core';
import { VacationService } from 'src/app/services/vacation.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pending-vacations',
  templateUrl: './pending-vacations.component.html',
  styleUrls: ['./pending-vacations.component.css']
})
export class PendingVacationsComponent implements OnInit {

  validateForm: FormGroup;

  public listOfData = [];
  private user: any;
  public isVisible: boolean;

  constructor(private vacationService: VacationService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.setupUser();
    this.setupData();
  }

  private setupData(): void {
    this.vacationService.getAllVacationRequestsByAdmin(this.user.id).subscribe(data => {
      this.listOfData = data;
    });
    this.isVisible = false;
    this.validateForm = this.fb.group({
      reason: [null, [Validators.required, Validators.minLength(4)]]
    });
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  } 

  confirm(id): void {
    this.vacationService.approveVacation(id).subscribe(data => {
      this.setupData();
    });
  }

  getReason(): void {
    this.isVisible = true;
  }

  deny(id): void {
    const body = {
      ...this.validateForm.value
    }
    console.log(body)
    this.vacationService.denyVacation(id, body).subscribe(data => {
      this.setupData();
    },
    error => {
      const message = error.error.message;
      console.log(message)
    });
  }

  formatDate(date): String {
    return moment(date).format("L");
  }

}