import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public getAllClinics(): Observable<any> {
    return this.http.get(`${this.baseUrl}clinics`);
  }

  public getClinic(id): Observable<any> {
    return this.http.get(`${this.baseUrl}clinics/${id}/clinic`);
  }

  public updateClinic(id, body): Observable<any> {
    return this.http.put(`${this.baseUrl}clinics/${id}/clinic`, body);
  }

  public deleteClinic(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}clinics/${id}/clinic`);
  }

  public getAvgGrade(id): Observable<any> {
    return this.http.get(`${this.baseUrl}grades/avg/${id}/clinic`);
  }
}
