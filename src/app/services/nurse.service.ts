import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NurseService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public getAllNurses(): Observable<any> {
    return this.http.get(`${this.baseUrl}nurses`);
  }

  public getAllNursesByClinic(id): Observable<any> {
    return this.http.get(`${this.baseUrl}nurses/${id}/clinic`);
  }

  public getNurse(id): Observable<any> {
    return this.http.get(`${this.baseUrl}nurses/${id}/nurse`);
  }

  public updateNurse(id, body): Observable<any> {
    return this.http.put(`${this.baseUrl}nurses/${id}/nurse`, body);
  }

  public deleteNurse(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}nurses/${id}/nurse`);
  }

  public createNurse(body, id): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/nurses/${id}/clinic`, body);
  }
}
