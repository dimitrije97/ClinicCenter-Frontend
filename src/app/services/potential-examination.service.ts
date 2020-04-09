import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PotentialExaminationService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getAllPotentialExaminations(): Observable<any> {
    return this.http.get(`${this.baseUrl}potential-examinations`);
  }

  public getAllPotentialExaminationsByClinic(id): Observable<any> {
    return this.http.get(`${this.baseUrl}potential-examinations/${id}/clinic`);
  }

  public createPotentialExamination(body): Observable<any> {
    return this.http.post(`${this.baseUrl}potential-examinations/create-potential-examination`, body);
  }

  public deletePotentialExamination(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}potential-examinations/${id}/potential-examination`);
  }

  public approvePotentialExamination(body): Observable<any> {
    return this.http.post(`${this.baseUrl}potential-examinations/approve-potential-examination`, body);
  }
}
