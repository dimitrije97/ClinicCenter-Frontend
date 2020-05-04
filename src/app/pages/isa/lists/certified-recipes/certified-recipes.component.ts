import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { RecipeService } from 'src/app/services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-certified-recipes',
  templateUrl: './certified-recipes.component.html',
  styleUrls: ['./certified-recipes.component.css']
})
export class CertifiedRecipesComponent implements OnInit {

  public listOfData = [];

  public medicineName: any = '';
  public diagnosisName: any = '';

  constructor(private message: NzMessageService, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.setupData();
  }

  private setupData(): void {
    this.recipeService.getAllCertifiedRecipes().subscribe(data => {
      this.listOfData = data;
    },
    error => {
      this.message.info(error.error.message);
      this.router.navigateByUrl('dashboard');
    });
  }

  public nurseDN(name, surname): String {
    return name+' '+surname;
  }

  public search(): void {
    const filteredObject = {
      medicineName: this.medicineName,
      diagnosisName: this.diagnosisName
    }
    this.recipeService.getAllCertifiedRecipesByMedicineNameAndDiagnosisName(filteredObject).subscribe(data => {
      this.listOfData = data;
    })
  }
}
