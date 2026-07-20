import { Component, OnInit, Output } from '@angular/core';
import { Emp } from 'src/app/Interface/Employee';
import { EmployeeServicesService } from 'src/app/service/employee-services.service';

@Component({
  selector: 'app-employee-display',
  templateUrl: './employee-display.component.html',
  styleUrls: ['./employee-display.component.css']
})
export class EmployeeDisplayComponent {
  result: Emp[];

  constructor(private employeeService: EmployeeServicesService) {
    this.result = this.employeeService.getEmp();
  }

  deleteEmp(index: number) {
    this.employeeService.deleteEmp(index);
  }

  updateEmp(index: number) {
    this.employeeService.selectEmployee(index);
  }
}
