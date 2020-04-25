import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'
import { RecipeService } from 'src/app/services/recipe.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.css']
})
export class NewReportComponent implements OnInit {

  public listOfData = [];
  public recipe: any;
  public validateForm: FormGroup;
  private user: any;

  constructor(private reportService: ReportService, private recipeService: RecipeService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private message: NzMessageService) { }

  ngOnInit(): void {
    this.setupForm();
    this.setupUser();
    this.setupData();
  }

  private setupForm(): void {
    this.validateForm = this.fb.group({
      description: [null]
    });
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  private setupData(): void {
    this.recipeService.getAllRecipes().subscribe(data => {
      this.listOfData = data;
    });
  }

  public recipeName(medicine, diagnosis): String {
    return medicine+' '+diagnosis;
  }

  public submitForm(): void {
    const id = this.route.snapshot.params.id;
    const body = {
      ...this.validateForm.value,
      patientId: id,
      doctorId: this.user.id,
      recipeId: this.recipe,
      currentTime: moment().format('HH:mm:ss')
    }
    this.reportService.createReport(body).subscribe(() => {
      this.message.info('Uspešno ste uneli izveštaj.');
    },
    error => {
      this.message.info(error.error.message);
    });
  }
}
