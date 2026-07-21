import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../Components/edit-dialog/edit-dialog.component';
import { ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit {
  @ViewChild('menuInput', { static: false }) menuInput!: ElementRef;

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

  isDialogOpen: boolean = false

  constructor(private sharedservice: SharedServiceService, private dialog: MatDialog) { }

  focusSearchInput() {
    setTimeout(() => {
      this.menuInput.nativeElement.focus();
    });
  }

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

  showDialog(employee: any) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '500px',
      data: {
        employee: {
          ...employee,
          address: {
            ...employee.address
          }
        }
      }
    });

    dialogRef.afterClosed().subscribe(updatedEmployee => {
      if (updatedEmployee) {
        const index = this.employees.findIndex(emp => emp.id === updatedEmployee.id);

        if (index !== -1) {
          this.employees[index] = updatedEmployee;
          this.employees = [...this.employees];
        }
      }
    });
  }

  DeleteEmp(id: number) {
    this.employees = this.employees.filter(emp => emp.id !== id);
  }
}