import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public createOperationRequest(body): Observable<any> {
    return this.http.post(`${this.baseUrl}operations/create-operation-request`, body)
  }

  public getAllPendingOperations(): Observable<any> {
    return this.http.get(`${this.baseUrl}operations/pending`);
  }

  public getAllPendingOperationsByClinic(id): Observable<any> {
    return this.http.get(`${this.baseUrl}operations/pending/${id}/clinic`);
  }

  public approveOperation(body): Observable<any> {
    return this.http.put(`${this.baseUrl}operations/approve-operation`, body);
  }

  public denyOperation(body): Observable<any> {
    return this.http.put(`${this.baseUrl}operations/deny-operation`, body);
  }

  public getAllFutureOperationsByPatient(id): Observable<any> {
    return this.http.get(`${this.baseUrl}operations/future/${id}/patient`);
  }

  public getAllFutureOperationsByDoctor(id): Observable<any> {
    return this.http.get(`${this.baseUrl}operations/future/${id}/doctor`);
  }

  public cancelFutureOperation(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}operations/cancel/${id}/operation`);
  }

  public getOperationsHistory(id): Observable<any> {
    return this.http.get(`${this.baseUrl}operations/history/${id}/patient`);
  }
}
