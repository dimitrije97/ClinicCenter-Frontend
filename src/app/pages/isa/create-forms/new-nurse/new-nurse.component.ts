import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NurseService } from 'src/app/services/nurse.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-new-nurse',
  templateUrl: './new-nurse.component.html',
  styleUrls: ['./new-nurse.component.css']
})
export class NewNurseComponent implements OnInit {

  validateForm: FormGroup;

  private user: any;
  public listOfData = [];
  startAt: Date | null = null;
  endAt: Date | null = null;

  constructor(private message: NzMessageService, private fb: FormBuilder, private nurseService: NurseService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.setupUser();
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

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    {
      const body = {
        ...this.validateForm.value,
        startAt: moment(this.startAt).format("HH:mm:ss"), 
        endAt: moment(this.endAt).format("HH:mm:ss")
      }
      console.log(body)
      this.nurseService.createNurse(body, this.user.myClinic.id).subscribe(data => {
        console.log(data);
        this.message.info('Uspešno ste kreirali novu medicinsku sestru.');
      // error => {
      //   this.message.info(error.error.message);
      },
      error => {
        this.message.info(error.error.message);
      });
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
