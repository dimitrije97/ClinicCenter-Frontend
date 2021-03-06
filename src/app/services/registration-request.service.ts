import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationRequestService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getAllRegistrationRequests(): Observable<any> {
    return this.http.get(`${this.baseUrl}patients/requests`);
  }

  public confirmRegistrationRequest(body): Observable<any> {
    return this.http.put(`${this.baseUrl}patients/confirm`, body);
  }

  public approveRegistrationRequest(body): Observable<any> {
    return this.http.put(`${this.baseUrl}patients/approve`, body);
  }

  public denyRegistrationRequest(id, body): Observable<any> {
    return this.http.put(`${this.baseUrl}patients/deny/${id}/request`, body);
  }
}
