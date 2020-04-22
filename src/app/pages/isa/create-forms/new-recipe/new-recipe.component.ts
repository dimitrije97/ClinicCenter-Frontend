import { Component, OnInit } from '@angular/core';
import { MedicineService } from 'src/app/services/medicine.service';
import { DiagnosisService } from 'src/app/services/diagnosis.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {

  public listOfData = [];
  public listOfData2 = [];
  public medicineId = null;
  public diagnosisId = null;

  constructor(private recipeService: RecipeService, private medicineService: MedicineService, private diagnosisService: DiagnosisService, private message: NzMessageService, private router: Router) { }

  ngOnInit(): void {
    this.setupData();
    this.setupData2();
  }

  private setupData(): void {
    this.medicineService.getAllMedicines().subscribe(data => {
      this.listOfData = data;
    });
  }

  private setupData2(): void {
    this.diagnosisService.getAllDiagnosis().subscribe(data => {
      this.listOfData2 = data;
    });
  }

  public create(): void {
    const body = {
      medicineId: this.medicineId,
      diagnosisId: this.diagnosisId
    }

    this.recipeService.createRecipe(body).subscribe(() => {
      this.message.info('Uspešno ste kreirali novi recept.');
      this.router.navigateByUrl('dashboard');
    })
  }
}
