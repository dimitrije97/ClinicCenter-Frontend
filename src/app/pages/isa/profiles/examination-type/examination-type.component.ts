import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExaminationTypeService } from 'src/app/services/examination-type.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-examination-type',
  templateUrl: './examination-type.component.html',
  styleUrls: ['./examination-type.component.css']
})
export class ExaminationTypeComponent implements OnInit {

  validateForm: FormGroup

  public isReadOnly: boolean;

  private id: string;
  private user: any;

  constructor(private message: NzMessageService, private route: ActivatedRoute, private examinationTypeService: ExaminationTypeService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setupUser();
    this.setupForm();
    this.extractId();
    this.getDetails();
    this.setupIsReadOnly();
  }

  private setupIsReadOnly(): void {
    if(this.user.userType === 'ADMIN'){
      this.isReadOnly = false;
    }else{
      this.isReadOnly = true;
    }
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  public setupForm(): void {
    this.validateForm = this.fb.group({
      price: [ {value: null, disabled: this.isReadOnly }, [Validators.pattern("^[0-9]*$"), Validators.required]],
      name: [ {value: null, disabled: this.isReadOnly }, [Validators.required, Validators.minLength(4)]]
    });
  }

  private extractId(): void {
    this.id = this.route.snapshot.params.id;
  }

  public getDetails(): void {
    this.examinationTypeService.getExaminationType(this.id).subscribe(data =>{
      const formValues = {
        price: data.price,
        name: data.name
      }
      this.validateForm.setValue(formValues);
    })
  }

  public update(): void {
    this.examinationTypeService.updateExaminationType(this.id, this.validateForm.value).subscribe(data => {
      this.message.info('Uspešno ste izmenili podatke.');
    },
    error => {
      this.message.info(error.error.message);
    });
  }

}
