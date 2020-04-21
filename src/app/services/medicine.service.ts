import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public createMedicine(body): Observable<any> {
    return this.http.post(`${this.baseUrl}medicines`, body);
  }

  public getAllMedicines(): Observable<any> {
    return this.http.get(`${this.baseUrl}medicines`);
  }
}
