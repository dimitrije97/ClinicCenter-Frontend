import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { MedicineService } from 'src/app/services/medicine.service';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent implements OnInit {

  public listOfData = [];
  private user: any;

  constructor(private message: NzMessageService, private router: Router, private medicineService: MedicineService) { }

  ngOnInit(): void {
    this.setupUser();
    this.setupData();
  }

  private setupData(): void {
    if(this.user.userType === 'CLINIC_CENTER_ADMIN') {
      this.medicineService.getAllMedicines().subscribe(data => {
        this.listOfData = data;
      },
      error => {
        this.message.info(error.error.message);
        this.router.navigateByUrl(`dashboard`);
      });
    }
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  public delete(id): void {
    this.medicineService.deleteMedicine(id).subscribe(() => {
      this.message.info('Uspešno ste obrisali lek.');
      this.setupData();
    });
  }

}
