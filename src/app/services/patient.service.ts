import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getAllPatients(): Observable<any> {
    return this.http.get(`${this.baseUrl}patients`);
  }

  public getAllPatientsByClinic(id): Observable<any> {
    return this.http.get(`${this.baseUrl}patients/${id}/clinic`);
  }

  public updatePatient(id, body): Observable<any> {
    return this.http.put(`${this.baseUrl}patients/${id}/patient`, body);
  }

  public getPatient(id): Observable<any> {
    return this.http.get(`${this.baseUrl}patients/${id}/patient`);
  }

  public deletePatient(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}patients/${id}/patient`);
  }

  public getAllPatientsByFirstNameAndLastNameAndSsn(filter = {}, id): Observable<any> {
    return this.http.get(`${this.baseUrl}patients/search/${id}/clinic/${this.buildFilterRequest(filter)}`);
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
