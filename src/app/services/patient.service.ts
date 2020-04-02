import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getAllPatients(): Observable<any> {
    return this.http.get(`${this.baseUrl}patients`);
  }

  public getAllPatientsByClinic(id): Observable<any> {
    return this.http.get(`${this.baseUrl}patients/${id}/clinic`);
  }

  public updatePatient(id, body): Observable<any> {
    return this.http.put(`${this.baseUrl}patients/${id}/patient`, body);
  }

  public getPatient(id): Observable<any> {
    return this.http.get(`${this.baseUrl}patients/${id}/patient`);
  }

  public deletePatient(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}patients/${id}/patient`);
  }
}
