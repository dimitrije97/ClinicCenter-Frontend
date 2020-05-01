import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicService } from 'src/app/services/clinic.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnInit {

  validateForm: FormGroup

  public isReadOnly: boolean;

  private id: string;
  private user: any;

  checked: boolean;

  lat: any = null;
  lon: any = null;

  constructor(private router: Router, private message: NzMessageService, private route: ActivatedRoute, private clinicService: ClinicService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setupUser();
    this.setupIsReadOnly();
    this.setupForm();
    this.extractId();
    this.getDetails();

    this.checked = false;
  }

  private setupIsReadOnly(): void {
    if(this.user.userType === 'ADMIN'){
      this.isReadOnly = false;
    }else if(this.user.userType === 'DOCTOR' || this.user.userType === 'NURSE'){
      this.isReadOnly = true;
    }
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  public setupForm(): void {
    this.validateForm = this.fb.group({
      name: [ {value: null, disabled: this.isReadOnly }, [Validators.minLength(4), Validators.required]],
      address: [ {value: null, disabled: this.isReadOnly }, [Validators.required, Validators.minLength(4)]],
      description: [ {value: null, disabled: this.isReadOnly }, [Validators.required, Validators.minLength(4)]]
    });
  }

  private extractId(): void {
    this.id = this.user.myClinic.id;
  }

  public getDetails(): void {
    this.clinicService.getClinic(this.id).subscribe(data =>{
      const formValues = {
        name: data.name,
        address: data.address,
        description: data.description,
      }
      this.lat = data.lat;
      this.lon = data.lon;
      this.validateForm.setValue(formValues);
    })
  }

  public update(): void {
    const body = {
      ...this.validateForm.value,
      lat: this.lat,
      lon: this.lon
    }
    this.clinicService.updateClinic(this.id, body).subscribe(data => {
      this.message.info('Uspešno ste izmenili podatke.');
    },
    error => {
      this.message.info(error.error.message);
    });
  }

  public location(): void {
    if(this.lat == null || this.lon == null){
      this.message.info('Još uvek ne postoji ta opcija za kliniku '+name+'.');
      return;
    }
    const body = {
      lat: this.lat,
      lon: this.lon
    }
    localStorage.setItem('latlon', JSON.stringify(body));
    this.router.navigateByUrl('dashboard/google-maps');
  }
}
