import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { ClinicService } from 'src/app/services/clinic.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-new-clinic',
  templateUrl: './new-clinic.component.html',
  styleUrls: ['./new-clinic.component.css']
})
export class NewClinicComponent implements OnInit {

  validateForm: FormGroup;

  checked: boolean;

  lat: any = null;
  lon: any = null;

  constructor(private message: NzMessageService, private fb: FormBuilder, private clinicService: ClinicService, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [ null, [Validators.minLength(4), Validators.required]],
      address: [ null, [Validators.required, Validators.minLength(4)]],
      description: [ null, [Validators.required, Validators.minLength(4)]]
    });
    this.checked = false
  }

  public create(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const body = {
      ...this.validateForm.value,
      lat: this.lat,
      lon: this.lon
    }
    this.clinicService.createClinic(body).subscribe(() => {
      this.message.info('Uspešno ste kreirali kliniku!');
    });
  }
}
