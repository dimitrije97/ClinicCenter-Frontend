import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required, Validators.email, Validators.minLength(3)]],
      password: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.authService.login(this.validateForm.value).subscribe(data => {
      const user = data.userResponse;
      console.log(data)
      localStorage.setItem('user', JSON.stringify(user));
      if(user.userType === 'DOCTOR') {
        if(user.setNewPassword) {
          const id = user.id;
          this.router.navigateByUrl(`auth/${id}/new-password`);
        } else {
         
        }
      } else if(user.userType === 'PATIENT') {
        
      } else if(user.userType === 'ADMIN') {
        if(user.setNewPassword) {
          const id = user.id;
          this.router.navigateByUrl(`auth/${id}/new-password`);
        } else {
          
        }
      } else if(user.userType === 'CLINIC_CENTER_ADMIN') {
        if(user.setNewPassword) {
          const id = user.id;
          this.router.navigateByUrl(`auth/${id}/new-password`);
        } else {
          
        }
      }
      
    },
    error => {
      const message = error.error.message;
      console.log(message)
    })
  }

  onRegistration(): void {
    this.router.navigateByUrl('auth/registration');
  }

}
