import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public getAllVacationRequests(): Observable<any> {
    return this.http.get(`${this.baseUrl}vacations`);
  }

  public getAllVacationRequestsByAdmin(id): Observable<any> {
    return this.http.get(`${this.baseUrl}vacations/${id}/admin`);
  }

  public denyVacation(id , body): Observable<any> {
    return this.http.post(`${this.baseUrl}vacations/deny/${id}/vacation-request`, body);
  }

  public approveVacation(id): Observable<any> {
    return this.http.post(`${this.baseUrl}vacations/approve/${id}/vacation-request`, null);
  }
}
