import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { DiagnosisService } from 'src/app/services/diagnosis.service';

@Component({
  selector: 'app-new-diagnosis',
  templateUrl: './new-diagnosis.component.html',
  styleUrls: ['./new-diagnosis.component.css']
})
export class NewDiagnosisComponent implements OnInit {

  validateForm: FormGroup

  private user: any;

  constructor(private message: NzMessageService, private diagnosisService: DiagnosisService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setupUser();
    this.setupForm();
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  public setupForm(): void {
    this.validateForm = this.fb.group({
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
      this.diagnosisService.createDiagnosis(this.validateForm.value).subscribe(data => {
        this.message.info('Uspešno ste kreirali novu dijagnozu.');
      });
    }
  }
}
