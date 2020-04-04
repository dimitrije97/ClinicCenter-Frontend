import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExaminationTypeService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public getAllExaminationTypes(): Observable<any> {
    return this.http.get(`${this.baseUrl}examination-types`);
  }

  public getAllExaminationTypesByClinic(id): Observable<any> {
    return this.http.get(`${this.baseUrl}examination-types/${id}/clinic`);
  }

  public getExaminationType(id): Observable<any> {
    return this.http.get(`${this.baseUrl}examination-types/${id}/examination-type`);
  }

  public updateExaminationType(id, body): Observable<any> {
    return this.http.put(`${this.baseUrl}examination-types/${id}/examination-type`, body);
  }

  public deleteExaminationType(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}examination-types/${id}/examination-type`);
  }

  public createExaminationType(body): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/examination-types`, body);
  }
}
