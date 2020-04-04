import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public getAllDoctors(): Observable<any> {
    return this.http.get(`${this.baseUrl}doctors`);
  }

  public getAllDoctorsByClinic(id): Observable<any> {
    return this.http.get(`${this.baseUrl}doctors/${id}/clinic`);
  }

  public getDoctor(id): Observable<any> {
    return this.http.get(`${this.baseUrl}doctors/${id}/doctor`);
  }

  public updateDoctor(id, body): Observable<any> {
    return this.http.put(`${this.baseUrl}doctors/${id}/doctor`, body);
  }

  public deleteDoctor(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}doctors/${id}/doctor`);
  }

  public createDoctor(body, id): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/doctors/${id}/clinic`, body);
  }
}
