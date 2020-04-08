import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExaminationTypeService } from 'src/app/services/examination-type.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-new-examination-type',
  templateUrl: './new-examination-type.component.html',
  styleUrls: ['./new-examination-type.component.css']
})
export class NewExaminationTypeComponent implements OnInit {

  validateForm: FormGroup

  private user: any;

  constructor(private message: NzMessageService, private route: ActivatedRoute, private examinationTypeService: ExaminationTypeService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setupUser();
    this.setupForm();
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  public setupForm(): void {
    this.validateForm = this.fb.group({
      price: [ null, [Validators.pattern("^[0-9]*$"), Validators.required]],
      name: [ null, [Validators.required, Validators.minLength(4)]]
    });
  }

  create(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    {
      console.log(this.validateForm.value)
      this.examinationTypeService.createExaminationType(this.validateForm.value).subscribe(data => {
        this.message.info('Uspešno ste kreirali novi tip pregleda.');
      },
      error => {
        this.message.info(error.error.message);
      });
    }
  }

}
