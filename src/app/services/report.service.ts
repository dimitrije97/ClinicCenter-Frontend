import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public createReport(body): Observable<any> {
    return this.http.post(`${this.baseUrl}reports`, body);
  }

  public getAllReportsByMedicalRecord(id): Observable<any> {
    return this.http.get(`${this.baseUrl}reports/${id}/medical-record`);
  }

  public getReport(id): Observable<any> {
    return this.http.get(`${this.baseUrl}reports/${id}/report`);
  }

  public updateReport(body): Observable<any> {
    return this.http.put(`${this.baseUrl}reports`, body);
  }
}
