import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { ExaminationTypeService } from 'src/app/services/examination-type.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-new-doctor',
  templateUrl: './new-doctor.component.html',
  styleUrls: ['./new-doctor.component.css']
})
export class NewDoctorComponent implements OnInit {

  validateForm: FormGroup;

  private user: any;
  public listOfData = [];
  startAt: Date | null = null;
  endAt: Date | null = null;
  examinationTypeId = null;

  constructor(private examinationTypeService: ExaminationTypeService, private fb: FormBuilder, private doctorService: DoctorService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.setupUser();
    this.setupData();
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      firstName: [null, [Validators.required, Validators.minLength(4)]],
      lastName: [null, [Validators.required, Validators.minLength(4)]],
      phone: [null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8)]],
      address: [null, [Validators.required, Validators.minLength(4)]],
      city: [null, [Validators.required, Validators.minLength(4)]],
      country: [null, [Validators.required, Validators.minLength(4)]],
      ssn: [null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(13), Validators.maxLength(13)]]
    });
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  
  private setupData(): void {
    this.examinationTypeService.getAllExaminationTypes().subscribe(data => {
      this.listOfData = data;
    },
    error => {
      const message = error.error.message;
      console.log(message)
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    {
      const body = {
        ...this.validateForm.value,
        startAt: moment(this.startAt).format("HH:mm:ss"), 
        endAt: moment(this.endAt).format("HH:mm:ss"),
        examinationTypeId: this.examinationTypeId
      }
      console.log(body)
      this.doctorService.createDoctor(body, this.user.myClinic.id).subscribe(data => {
        console.log(data);
      }) 
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.rePassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

}
