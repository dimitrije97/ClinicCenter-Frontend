import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public getAllPendingExaminations(): Observable<any> {
    return this.http.get(`${this.baseUrl}examinations/pending`);
  }

  public getAllPendingExaminationsByClinic(id): Observable<any> {
    return this.http.get(`${this.baseUrl}examinations/pending/${id}/clinic`);
  }

  public denyExamination(body): Observable<any> {
    return this.http.post(`${this.baseUrl}examinations/deny-examination`, body);
  }

  public confirmExamination(body): Observable<any> {
    return this.http.post(`${this.baseUrl}examinations/confirm-examination-request`, body);
  }

  public createExaminationRequestAsDoctor(body, id): Observable<any> {
    return this.http.post(`${this.baseUrl}examinations/create-examination-request/${id}/doctor`, body);
  }

  public createExaminationRequestAsPatient(body): Observable<any> {
    return this.http.post(`${this.baseUrl}examinations/create-examination-request`, body);
  }

  public getAllConfirmingExaminationsByPatient(id): Observable<any> {
    return this.http.get(`${this.baseUrl}examinations/confirming/${id}/patient`);
  }

  public approveExamination(body): Observable<any> {
    return this.http.post(`${this.baseUrl}examinations/approve-examination`, body);
  }

  public getAllFutureExaminationsByPatient(id): Observable<any> {
    return this.http.get(`${this.baseUrl}examinations/future/${id}/patient`);
  }

  public getAllFutureExaminationsByDoctor(id): Observable<any> {
    return this.http.get(`${this.baseUrl}examinations/future/${id}/doctor`);
  }

  public cancelFutureExamination(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}examinations/cancel/${id}/examination`);
  }

  public getExaminationsHistory(id): Observable<any> {
    return this.http.get(`${this.baseUrl}examinations/history/${id}/patient`);
  }

  public getExaminationsHistoryByName(filter = {}, id): Observable<any> {
    return this.http.get(`${this.baseUrl}examinations/search/history/${id}/patient${this.buildFilterRequest(filter)}`);
  }

  public getAllFutureExaminationsByAdmin(id): Observable<any> {
    return this.http.get(`${this.baseUrl}examinations/future/${id}/clinic`);
  }

  private buildFilterRequest(filterObject: any): String {
    const values = Object.keys(filterObject).filter(filterValue => filterValue !== null || filterValue !== '');
    if(values.length === 0) {
      return '';
    }
    let filterQuery = '?';
    let counter;
    Object.keys(filterObject).forEach(x => {
      if(filterObject[x] !== null || filterObject[x] !== '') {
        let temp = '';
        if(counter === 0) {
          temp = '';
        } else {
          temp = '&';
        }
        filterQuery = filterQuery + temp + x + '=' + filterObject[x];
        counter = counter + 1;
      }
    })
    return filterQuery;
  }
}
