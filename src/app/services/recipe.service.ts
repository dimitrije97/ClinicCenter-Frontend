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

  public getAllCertifiedRecipes(): Observable<any> {
    return this.http.get(`${this.baseUrl}recipes/certified`);
  }

  public getAllNonCertifiedRecipes(): Observable<any> {
    return this.http.get(`${this.baseUrl}recipes/non-certified`);
  }

  public certifyRecipe(body): Observable<any> {
    return this.http.put(`${this.baseUrl}recipes`, body);
  }

  public deleteRecipe(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}recipes/${id}/recipe`);
  }
}
