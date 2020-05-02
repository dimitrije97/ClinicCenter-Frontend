import { Component, OnInit } from '@angular/core';
import { IncomeService } from 'src/app/services/income.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-clinics-income',
  templateUrl: './clinics-income.component.html',
  styleUrls: ['./clinics-income.component.css']
})
export class ClinicsIncomeComponent implements OnInit {

  validateForm: FormGroup;
  validateForm2: FormGroup;
  private user: any;
  
  public thisMonthIncomePercent: any;
  public lastMonthIncomePercent: any;
  public lastLastMonthIncomePercent: any;

  public thisDayIncomePercent: any;
  public lastDayIncomePercent: any;
  public lastLastDayIncomePercent: any;

  constructor(private fb: FormBuilder, private incomeService: IncomeService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      income: [null, [Validators.required]],
      examinations: [null, [Validators.required]],
      thisMonthIncome: [null, [Validators.required]],
      thisMonthExaminations: [null, [Validators.required]],
      lastMonthIncome: [null, [Validators.required]],
      lastMonthExaminations: [null, [Validators.required]],
      lastLastMonthIncome: [null, [Validators.required]],
      lastLastMonthExaminations: [null, [Validators.required]]
    });
    this.validateForm2 = this.fb.group({
      thisDayIncome: [null, [Validators.required]],
      thisDayExaminations: [null, [Validators.required]],
      lastDayIncome: [null, [Validators.required]],
      lastDayExaminations: [null, [Validators.required]],
      lastLastDayIncome: [null, [Validators.required]],
      lastLastDayExaminations: [null, [Validators.required]]
    });
    this.setupUser();
    this.setupData();
  }

  public setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  public setupData(): void {
    this.incomeService.getClinicsMonthlyIncome(this.user.myClinic.id).subscribe(data => {
      this.validateForm = this.fb.group({
        income: data.income,
        examinations: data.examinations,
        thisMonthIncome: data.thisMonthIncome,
        thisMonthExaminations: data.thisMonthExaminations,
        lastMonthIncome: data.lastMonthIncome,
        lastMonthExaminations: data.lastMonthExaminations,
        lastLastMonthIncome: data.lastLastMonthIncome,
        lastLastMonthExaminations: data.lastLastMonthExaminations
      });
      this.thisMonthIncomePercent = data.thisMonthIncomePercent;
      this.lastMonthIncomePercent = data.lastMonthIncomePercent;
      this.lastLastMonthIncomePercent = data.lastLastMonthIncomePercent;
    });

    this.incomeService.getClinicsDailyIncome(this.user.myClinic.id).subscribe(data => {
      this.validateForm2 = this.fb.group({
        thisDayIncome: data.thisDayIncome,
        thisDayExaminations: data.thisDayExaminations,
        lastDayIncome: data.lastDayIncome,
        lastDayExaminations: data.lastDayExaminations,
        lastLastDayIncome: data.lastLastDayIncome,
        lastLastDayExaminations: data.lastLastDayExaminations
      });
      console.log(this.validateForm2.value)
      this.thisDayIncomePercent = data.thisDayIncomePercent;
      this.lastDayIncomePercent = data.lastDayIncomePercent;
      this.lastLastDayIncomePercent = data.lastLastDayIncomePercent;
    });
  }
}
