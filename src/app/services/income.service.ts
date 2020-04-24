import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public getClinicsIncome(id): Observable<any> {
    return this.http.get(`${this.baseUrl}incomes/${id}/clinic`);
  }

  public getClinicsMonthlyIncome(id): Observable<any> {
    return this.http.get(`${this.baseUrl}incomes/monthly/${id}/clinic`);
  }
}
