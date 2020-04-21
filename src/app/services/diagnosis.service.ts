import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public createDiagnosis(body): Observable<any> {
    return this.http.post(`${this.baseUrl}diagnosis`, body);
  }

  public getAllDiagnosis(): Observable<any> {
    return this.http.get(`${this.baseUrl}diagnosis`);
  }

  public deleteDiagnosis(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}diagnosis/${id}/diagnosis`);
  }

  public updateDiagnosis(body): Observable<any> {
    return this.http.put(`${this.baseUrl}diagnosis`, body);
  }
}
