import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private message: NzMessageService, private route: ActivatedRoute, private clinicService: ClinicService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setupUser();
    this.setupIsReadOnly();
    this.setupForm();
    this.extractId();
    this.getDetails();
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
      this.validateForm.setValue(formValues);
    })
  }

  public update(): void {
    this.clinicService.updateClinic(this.id, this.validateForm.value).subscribe(data => {
      this.message.info('Uspešno ste izmenili podatke.');
    },
    error => {
      this.message.info(error.error.message);
    });
  }
}
