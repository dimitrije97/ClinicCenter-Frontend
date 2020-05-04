import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public createRecipe(body): Observable<any> {
    return this.http.post(`${this.baseUrl}recipes`, body);
  }

  public getAllRecipes(): Observable<any> {
    return this.http.get(`${this.baseUrl}recipes`);
  }

  public getAllCertifiedRecipes(id): Observable<any> {
    return this.http.get(`${this.baseUrl}recipes/certified/${id}/clinic`);
  }

  public getAllNonCertifiedRecipes(id): Observable<any> {
    return this.http.get(`${this.baseUrl}recipes/non-certified/${id}/clinic`);
  }

  public getAllWaitingRecipes(id): Observable<any> {
    return this.http.get(`${this.baseUrl}recipes/waiting/${id}/clinic`);
  }

  public certifyRecipe(body): Observable<any> {
    return this.http.put(`${this.baseUrl}recipes`, body);
  }

  public deleteRecipe(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}recipes/${id}/recipe`);
  }

  public getAllCertifiedRecipesByMedicineNameAndDiagnosisName(filter = {}, id): Observable<any> {
    return this.http.get(`${this.baseUrl}recipes/certified/search/${id}/clinic${this.buildFilterRequest(filter)}`);
  }

  private buildFilterRequest(filterObject: any): String {
    const values = Object.keys(filterObject).filter(filterValue => filterValue !== null || filterValue !== '');
    if(values.length === 0) {
      return '';
    }
    let filterQuery = '?';
    let counter;
    Object.keys(filterObject).forEach(x => {
      if(filterObject[x] !== null || filterObject[x] !== '') {
        let temp = '';
        if(counter === 0) {
          temp = '';
        } else {
          temp = '&';
        }
        filterQuery = filterQuery + temp + x + '=' + filterObject[x];
        counter = counter + 1;
      }
    })
    return filterQuery;
  }
}
