import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  employees: any[] = [];
  private employeeAddedSource = new Subject<any>();
  employeeAdded$ = this.employeeAddedSource.asObservable();

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get<any>('https://dummyjson.com/users');
  }

  addEmployee(employee: any) {
    this.employeeAddedSource.next(employee);
  }

  setEmployees(employees: any[]) {
    this.employees = employees;
  }

  getEmployees() {
    return this.employees;
  }
}
