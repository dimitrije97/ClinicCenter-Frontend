import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public getAllClinics(): Observable<any> {
    return this.http.get(`${this.baseUrl}clinics`);
  }

  public getClinic(id): Observable<any> {
    return this.http.get(`${this.baseUrl}clinics/${id}/clinic`);
  }

  public updateClinic(id, body): Observable<any> {
    return this.http.put(`${this.baseUrl}clinics/${id}/clinic`, body);
  }

  public deleteClinic(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}clinics/${id}/clinic`);
  }

  public getAvgGrade(id): Observable<any> {
    return this.http.get(`${this.baseUrl}grades/avg/${id}/clinic`);
  }

  public createClinic(body): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/clinics`, body);
  }

  public getAllClinicsByNameAndAddress(filter = {}): Observable<any> {
    return this.http.get(`${this.baseUrl}clinics/search${this.buildFilterRequest(filter)}`);
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
