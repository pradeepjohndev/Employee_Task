import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from 'src/app/shared/shared-service.service';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'fullName',
    'age',
    'email',
    'phone',
    'country',
    'role'
  ];

  allEmployees: any[] = [];

  employees: any[] = [];
  searchText: string = '';

  constructor(private sharedservice: SharedServiceService) { }

  ngOnInit() {
    this.sharedservice.getUser().subscribe(response => {
      this.allEmployees = response.users;
      this.employees = [...this.allEmployees];
      console.log(this.employees);
    });
  }

  ascending() {
    this.employees = [...this.employees].sort((a, b) => a.id - b.id);
  }

  descending() {
    this.employees = [...this.employees].sort((a, b) => b.id - a.id);
  }

  searchByName() {
    const search = this.searchText.trim().toLowerCase();

    if (!search) {
      this.employees = [...this.allEmployees];
      return;
    }

    this.employees = this.allEmployees.filter(employee => {
      const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
      return fullName.includes(search);
    });
  }
}