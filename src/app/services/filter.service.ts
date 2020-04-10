import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public getFilteredClinics(body): Observable<any> {
    return this.http.post(`${this.baseUrl}filters/clinics`, body);
  }

  public getFilteredDoctors(body): Observable<any> {
    return this.http.post(`${this.baseUrl}filters/doctors`, body);
  }

  // private buildFilterRequest(filterObject: any): String {
  //   const values = Object.keys(filterObject).filter(filterValue => filterValue !== null || filterValue !== '');
  //   if(values.length === 0) {
  //     return '';
  //   }
  //   let filterQuery = '?';
  //   let counter;
  //   Object.keys(filterObject).forEach(x => {
  //     if(filterObject[x] !== null || filterObject[x] !== '') {
  //       let temp = '';
  //       if(counter === 0) {
  //         temp = '';
  //       } else {
  //         temp = '&';
  //       }
  //       filterQuery = filterQuery + temp + x + '=' + filterObject[x];
  //       counter = counter + 1;
  //     }
  //   })
  //   return filterQuery;
  // }
}
