import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public createMedicalRecord(body): Observable<any> {
    return this.http.post(`${this.baseUrl}medical-records`, body);
  }

  public getAllMedicalRecords(): Observable<any> {
    return this.http.get(`${this.baseUrl}medical-records`);
  }

  public getMedicalRecordByPatient(id): Observable<any> {
    return this.http.get(`${this.baseUrl}medical-records/${id}/patient`);
  }

  public updateMedicalRecord(body): Observable<any> {
    return this.http.put(`${this.baseUrl}medical-records`, body);
  }
}
