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
}
