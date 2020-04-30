import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public getDoctorsSchedules(id): Observable<any> {
    return this.http.get(`${this.baseUrl}schedules/${id}/doctor`);
  }

  public getNursesSchedules(id): Observable<any> {
    return this.http.get(`${this.baseUrl}schedules/${id}/nurse`);
  }
}
