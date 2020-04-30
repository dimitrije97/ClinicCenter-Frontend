import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public createMedicalRecord(body): Observable<any> {
    return this.http.post(`${this.baseUrl}medical-records`, body);
  }

  public getAllMedicalRecords(): Observable<any> {
    return this.http.get(`${this.baseUrl}medical-records`);
  }

  public getMedicalRecordByPatient(filter = {}): Observable<any> {
    return this.http.get(`${this.baseUrl}medical-records/patient${this.buildFilterRequest(filter)}`);
  }

  public updateMedicalRecord(body): Observable<any> {
    return this.http.put(`${this.baseUrl}medical-records`, body);
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
