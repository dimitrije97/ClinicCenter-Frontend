import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public getAllAdmins(): Observable<any> {
    return this.http.get(`${this.baseUrl}admins`);
  }

  public getAllAdminsByClinic(id): Observable<any> {
    return this.http.get(`${this.baseUrl}admins/${id}/clinic`);
  }

  public getAdmin(id): Observable<any> {
    return this.http.get(`${this.baseUrl}admins/${id}/admin`);
  }

  public updateAdmin(id, body): Observable<any> {
    return this.http.put(`${this.baseUrl}admins/${id}/admin`, body);
  }

  public deleteAdmin(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}admins/${id}/admin`);
  }

  public createAdmin(body): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/admins`, body);
  }
}
