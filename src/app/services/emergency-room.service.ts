import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmergencyRoomService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public getAllEmergencyRooms(): Observable<any> {
    return this.http.get(`${this.baseUrl}emergency-rooms`);
  }

  public getAllEmergencyRoomsByClinic(id): Observable<any> {
    return this.http.get(`${this.baseUrl}emergency-rooms/${id}/clinic`);
  }

  public getEmergencyRoom(id): Observable<any> {
    return this.http.get(`${this.baseUrl}emergency-rooms/${id}/emergency-room`);
  }

  public updateEmergencyRoom(id, body): Observable<any> {
    return this.http.put(`${this.baseUrl}emergency-rooms/${id}/emergency-room`, body);
  }

  public deleteEmergencyRoom(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}emergency-rooms/${id}/emergency-room`);
  }

  public createEmergencyRoom(body, id): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/emergency-rooms/${id}/clinic`, body);
  }

  public getAllEmergencyRoomsByClinicByNameAndNumber(filter = {}, id): Observable<any> {
    return this.http.get(`${this.baseUrl}emergency-rooms/search/${id}/clinic${this.buildFilterRequest(filter)}`);
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
