import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuggestService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public suggest(id): Observable<any> {
    return this.http.get(`${this.baseUrl}suggests/${id}/examination`);
  }
}
