import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../Components/edit-dialog/edit-dialog.component';
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

  allEmployees: any[] = []; // local source of truth
  employees: any[] = [];  // table display value
  searchText: string = '';
  isLoading: boolean = true;
  noResult: boolean = false;

  onDelete: boolean = false;
  currentUser: number = 0;

  constructor(private sharedservice: SharedServiceService, private dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading = true;

    this.sharedservice.getUser().subscribe(response => {
      this.allEmployees = response.users;
      this.employees = [...this.allEmployees];
      this.sharedservice.setEmployees(this.allEmployees);
      this.isLoading = false;
      /* setTimeout(() => {
        this.isLoading = false;
      }, 1000); */
      // for testing the loader

      console.log("shallow copy", this.employees);
    }, error => {
      console.error('Failed to load employees', error);
      this.isLoading = false;
    });

    this.sharedservice.employeeAdded$.subscribe(newEmployee => {
      const idExists = this.allEmployees.some(employee => employee.id === newEmployee.id);

      if (idExists) {
        alert('Employee ID already exists');
        return;
      }
      this.allEmployees.push(newEmployee);
      this.allEmployees = [...this.allEmployees];
      this.searchByName();
    });
  }

  focusSearchInput() {
    setTimeout(() => {
      this.menuInput.nativeElement.focus();
    }, 100);
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
      this.noResult = false
      return;
    }

    this.employees = this.allEmployees.filter(employee => {
      const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
      return fullName.includes(search);
    });

    this.noResult = this.employees.length === 0;
  }

  showDialog(employee: any) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '500px',
      data: {
        mode: 'edit',
        employee: {
          ...employee,
          address: {
            ...employee.address
          }
        }
      }
    });

    dialogRef.afterClosed().subscribe(updatedEmployee => {
      if (!updatedEmployee) {
        return;
      }
      const index = this.allEmployees.findIndex(emp => emp.id === updatedEmployee.id);

      if (index !== -1) {
        this.allEmployees[index] = updatedEmployee;
        this.allEmployees = [...this.allEmployees];
      }
      this.searchByName()
    });
  }

  DeleteEmp(id: number) {
    this.sharedservice.deleteUser(id).subscribe({
      next: (response) => {
        const index = this.allEmployees.findIndex(emp => emp.id === id);
        if (index !== -1) {
          this.allEmployees = this.allEmployees.toSpliced(index, 1);
        } this.searchByName();
        this.onDelete = true;
        this.currentUser = id
        this.isLoading = true
        setTimeout(() => {
          this.onDelete = false;
          this.isLoading = false;
        }, 1000);
      },
      error: (error) => {
        console.error('Delete failed', error);
      }
    });
  }

  reset() {
    this.searchText = '';
    this.searchByName();
    this.focusSearchInput();
  }

  close() {
    this.searchText = '';
    this.searchByName();
  }
}