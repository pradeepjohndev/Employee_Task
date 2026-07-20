import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Emp } from '../Interface/Employee';

@Injectable({
  providedIn: 'root'
})

export class EmployeeServicesService {
  employee: Emp[] = [];
  selectedEmployee = new Subject<{ employee: Emp, index: number }>();
  employeeDeleted = new Subject<number>();

  addEmp(employee: Emp) {
    this.employee.push(employee);
    this.employee.sort((a, b) => (a.id || 0) - (b.id || 0));
  }

  getEmp() {
    return this.employee
  }

  deleteEmp(index: number) {
    this.employee.splice(index, 1);
    this.employeeDeleted.next(index)
  }

  selectEmployee(index: number) {
    const empCopy = { ...this.employee[index] };

    this.selectedEmployee.next({
      employee: empCopy,
      index: index
    });
  }

  isExist(id: number): boolean {
    return this.employee.some(emp => emp.id === id);
  }

  editEmp(index: number, updatedEmployee: Emp) {
    this.employee[index] = updatedEmployee;

  }
}
