import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css']
})
export class FirstLoginComponent implements OnInit {

  validateForm: FormGroup;
  private id: any;
  
  constructor(private message: NzMessageService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.setupForm();
    this.extractId();
  }

  private setupForm(): void {
    this.validateForm = this.fb.group({
      password: [null, [Validators.required, Validators.minLength(4)]],
      rePassword: [null, [Validators.required]]
    })
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.authService.updatePassword(this.id, this.validateForm.value).subscribe(data => {
      localStorage.clear();
      this.message.info('Uspešno ste izmenili lozinku.');
      this.router.navigateByUrl("auth/login");
    },
    error => {
      this.message.info(error.error.message);
    });
  }

  private extractId(): void {
    this.id = this.route.snapshot.params.id;
  }

}
