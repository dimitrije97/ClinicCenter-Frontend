import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public getAllDoctorsWhoCanBeGraded(id): Observable<any> {
    return this.http.get(`${this.baseUrl}grades/doctors/${id}/patient`);
  }

  public getAllClinicsWhichCanBeGraded(id): Observable<any> {
    return this.http.get(`${this.baseUrl}grades/clinics/${id}/patient`);
  }

  public gradeDoctor(body): Observable<any> {
    return this.http.post(`${this.baseUrl}grades/grade-doctor`, body);
  }

  public gradeClinic(body): Observable<any> {
    return this.http.post(`${this.baseUrl}grades/grade-clinic`, body);
  }
}
