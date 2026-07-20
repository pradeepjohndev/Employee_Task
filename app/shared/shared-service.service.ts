import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  private api = 'https://dummyjson.com/users';
  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    return this.http.get<any>(this.api)
  }
}
