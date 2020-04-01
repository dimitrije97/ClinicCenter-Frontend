import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css']
})
export class FirstLoginComponent implements OnInit {

  validateForm: FormGroup;
  
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.setupForm();
  }

  submitForm() {

  }

  setupForm(): void {
    this.validateForm = this.fb.group({
      password: [null, [Validators.required, Validators.minLength(4)]],
      rePassword: [null, [Validators.required]]
    })
  }

}
