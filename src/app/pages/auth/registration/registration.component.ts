import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  validateForm: FormGroup;

  private user: any

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(4)]],
      rePassword: [null, [Validators.required, this.confirmationValidator]],
      firstName: [null, [Validators.required, Validators.minLength(3)]],
      lastName: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.minLength(8), Validators.pattern("^[0-9]*$")]],
      address: [null, [Validators.required, Validators.minLength(4)]],
      city: [null, [Validators.required, Validators.minLength(4)]],
      country: [null, [Validators.required, Validators.minLength(4)]],
      ssn: [null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
    });

    this.setupUser();
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
      console.log(this.validateForm.value)
      this.authService.createPatient(this.validateForm.value).subscribe(data => {
        this.router.navigateByUrl('auth/login');
      }) 
    }
  }

  updateConfirmValidator(): void {
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

}
