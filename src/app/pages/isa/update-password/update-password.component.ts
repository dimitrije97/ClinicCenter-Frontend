import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  
  validateForm: FormGroup;
  private user: any;

  
  constructor(private message: NzMessageService, private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.setupUser();
    this.setupForm();
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  submitForm(): void {
    this.authService.updatePassword(this.user.id, this.validateForm.value).subscribe(data => {
      this.message.info('Uspešno ste izmenili lozinku.');
    },
    error => {
      this.message.info(error.error.message);
    });
  }

  private setupForm(): void {
    this.validateForm = this.fb.group({
      password: [null, [Validators.required, Validators.minLength(4)]],
      rePassword: [null, [Validators.required]]
    })
  }

}
