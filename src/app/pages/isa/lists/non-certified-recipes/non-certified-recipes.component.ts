import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { RecipeService } from 'src/app/services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-non-certified-recipes',
  templateUrl: './non-certified-recipes.component.html',
  styleUrls: ['./non-certified-recipes.component.css']
})
export class NonCertifiedRecipesComponent implements OnInit {

  public listOfData = [];
  private user: any;
  public isDoctor: boolean;

  constructor(private message: NzMessageService, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.setupUser();
    this.setupUserType();
    this.setupData();
  }

  private setupUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  private setupUserType(): void {
    if(this.user.userType === 'DOCTOR'){
      this.isDoctor = true;
    }else{
      this.isDoctor = false;
    }
  }

  private setupData(): void {
    if(this.isDoctor){
      this.recipeService.getAllNonCertifiedRecipes().subscribe(data => {
        this.listOfData = data;
      },
      error => {
        this.message.info(error.error.message);
        this.router.navigateByUrl('dashboard');
      });
    }else{
      this.recipeService.getAllWaitingRecipes().subscribe(data => {
        this.listOfData = data;
      },
      error => {
        this.message.info(error.error.message);
        this.router.navigateByUrl('dashboard');
      });
    }
  }

  public delete(id): void {
    this.recipeService.deleteRecipe(id).subscribe(() => {
      this.message.info('Uspešno ste obrisali recept.');
      this.setupData();
    });
  }

  public certify(id): void {
    const body = {
      recipeId: id
    }
    this.recipeService.certifyRecipe(body).subscribe(() => {
      this.message.info('Uspešno ste overili recept.');
      this.setupData();
    })
  }
}
