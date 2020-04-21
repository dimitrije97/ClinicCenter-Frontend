import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { MedicineService } from 'src/app/services/medicine.service';

@Component({
  selector: 'app-new-medicine',
  templateUrl: './new-medicine.component.html',
  styleUrls: ['./new-medicine.component.css']
})
export class NewMedicineComponent implements OnInit {

  validateForm: FormGroup

  private user: any;

  constructor(private message: NzMessageService, private medicineService: MedicineService, private fb: FormBuilder) { }

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
      this.medicineService.createMedicine(this.validateForm.value).subscribe(data => {
        this.message.info('Uspešno ste kreirali novi lek.');
      });
    }
  }
}
