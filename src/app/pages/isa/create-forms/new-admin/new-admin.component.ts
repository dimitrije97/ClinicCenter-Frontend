import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { AdminService } from 'src/app/services/admin.service';
import { ClinicCenterAdminService } from 'src/app/services/clinic-center-admin.service';
import { Router } from '@angular/router';
import { ClinicService } from 'src/app/services/clinic.service';

@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.css']
})
export class NewAdminComponent implements OnInit {

  private user: any;

  validateForm: FormGroup;
  clinicId = null;
  listOfData = [];
  checked: boolean;

  isPredef: boolean;

  constructor(private message: NzMessageService, private adminService: AdminService, private ccadminService: ClinicCenterAdminService, private router: Router, private clinicService: ClinicService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setupUser();
    this.setupAdminType();
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
    this.checked = false;
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  private setupAdminType(): void {
    if(this.user.ccadminType === 'REGULAR'){
      this.isPredef = false;
    }else{
      this.isPredef = true;
    }
  }

  private setupData(): void {
    this.clinicService.getAllClinics().subscribe(data => {
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
      if(!this.checked){
        const body = {
          ...this.validateForm.value,
          clinicId: this.clinicId
        }
        console.log(body)
        this.adminService.createAdmin(body).subscribe(data => {
          console.log(data);
          this.message.info('Uspešno ste kreirali novog administratora.');
        // error => {
        //   this.message.info(error.error.message);
        });
      }else{
        const body = {
          ...this.validateForm.value
        }
        console.log(body)
        this.ccadminService.createCCAdmin(body).subscribe(data => {
          console.log(data);
          this.message.info('Uspešno ste kreirali novog administratora kliničkog centra.');
        // error => {
        //   this.message.info(error.error.message);
        });
      }
      
    }
  }

}
