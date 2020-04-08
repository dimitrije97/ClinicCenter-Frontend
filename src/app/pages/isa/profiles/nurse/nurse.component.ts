import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NurseService } from 'src/app/services/nurse.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent implements OnInit {

  validateForm: FormGroup

  @Input()
  public isReadOnly: boolean = true;

  private id: string;
  private user: any;

  constructor(private message: NzMessageService,private route: ActivatedRoute, private nurseService: NurseService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setupUser();
    this.setupForm();
    this.extractId();
    this.getDetails();
    
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  public setupForm(): void {
    this.validateForm = this.fb.group({
      email: [ {value: null, disabled: true }, [Validators.email, Validators.required]],
      firstName: [ {value: null, disabled: this.isReadOnly }, [Validators.required, Validators.minLength(4)]],
      lastName: [ {value: null, disabled: this.isReadOnly }, [Validators.required, Validators.minLength(4)]],
      phone: [ {value: null, disabled: this.isReadOnly }, [Validators.required, Validators.minLength(8), Validators.pattern("^[0-9]*$")]],
      address: [ {value: null, disabled: this.isReadOnly }, [Validators.required, Validators.minLength(4)]],
      city: [ {value: null, disabled: this.isReadOnly }, [Validators.required, Validators.minLength(4)]],
      country: [ {value: null, disabled: this.isReadOnly }, [Validators.required, Validators.minLength(4)]],
      ssn: [ {value: null, disabled: true }, [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern("^[0-9]*$")]],
    });
  }

  private extractId(): void {
    if(this.isReadOnly)
    {
      this.id = this.route.snapshot.params.id;
    } else {
      this.id = this.user.id;
    }
  }

  public getDetails(): void {
    this.nurseService.getNurse(this.id).subscribe(data =>{
      const formValues = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        ssn: data.ssn,
        address: data.address,
        city: data.city,
        country: data.country,
        phone: data.phone
      }
      this.validateForm.setValue(formValues);
    })
  }

  public update(): void {
    this.nurseService.updateNurse(this.id, this.validateForm.value).subscribe(data => {
      this.message.info('Uspešno ste izmenili podatke.');
    },
    error => {
      this.message.info(error.error.message);
    });
  }
}
