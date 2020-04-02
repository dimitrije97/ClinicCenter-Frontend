import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public login(body): Observable<any> {
    return this.http.post(this.baseUrl + 'auth/login', body);
  }

  public createPatient(body): Observable<any> {
    return this.http.post(this.baseUrl + 'auth/patients', body);
  }

  public firstLogin(id: string, body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/${id}/new-password`, body);
  }

  public showByRole (roles: string[]) : boolean {
    const userRaw = localStorage.getItem('user');
    const user = JSON.parse(userRaw);

    return roles.some(role => role === user.userType);
  }
}
