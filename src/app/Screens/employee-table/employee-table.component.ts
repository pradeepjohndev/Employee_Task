import { DialogService } from './../../shared/dialog.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
import { EditDialogComponent } from '../Components/edit-dialog/edit-dialog.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})

export class EmployeeTableComponent implements OnInit {
  @ViewChild('menuInput', { static: false }) menuInput!: ElementRef;

  currentPage = 1;
  itemsPerPage = 15;
  maxSize = 10;

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
  noResult: boolean = false;

  onDelete: boolean = false;
  currentUser: number = 0;

  constructor(private sharedservice: SharedServiceService,
    private DialogService: DialogService,
    private ngxLoader: NgxUiLoaderService) { }

  ngOnInit() {
    this.sharedservice.getUser().subscribe(response => {
      this.ngxLoader.start();
      this.allEmployees = response.users;
      this.employees = [...this.allEmployees];
      this.sharedservice.setEmployees(this.allEmployees);
      /* setTimeout(() => {
        this.isLoading = false;
      }, 1000); */
      // for testing the loader
      this.ngxLoader.stop();
      console.log("shallow copy", this.employees);
    }, error => {
      console.error('Failed to load employees', error);
    });

    this.sharedservice.employeeAdded$.subscribe(newEmployee => {
      this.ngxLoader.start();
      const idExists = this.allEmployees.some(employee => employee.id === newEmployee.id);

      if (idExists) {
        alert('Employee ID already exists');
        return;
      }

      this.allEmployees.push(newEmployee);
      this.allEmployees = [...this.allEmployees];
      this.searchByName();
      this.ngxLoader.stop();
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
    this.currentPage = 1;

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
    const dialogRef = this.DialogService.openEmployeeDialog(
      'edit',
      '500px',
      {
        ...employee,
        address: {
          ...employee.address
        }
      }
    );

    dialogRef.afterClosed().subscribe(updatedEmployee => {
      if (!updatedEmployee) { return; }
      const index = this.allEmployees.findIndex(emp => emp.id === updatedEmployee.id);

      if (index !== -1) {
        this.ngxLoader.start()
        this.allEmployees[index] = updatedEmployee;
        this.allEmployees = [...this.allEmployees];
        this.ngxLoader.stop()
      }
      this.searchByName();
    });
  }

  DeleteEmp(employee: any) {
    const dialogRef =
      this.DialogService.openConfirmationDialog(
        '500px',
        {
          title: 'Delete Employee',
          message: `Are you sure you want to delete Delete ${employee.firstName} ${employee.lastName} with the ID ${employee.id}`,
          isdeleteBtn: 'Delete',
        });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.deleteEmployee(employee.id);
    });
  }

  private deleteEmployee(id: number) {
    this.sharedservice.deleteUser(id).subscribe({
      next: (response) => {
        console.log(response)
        const index = this.allEmployees.findIndex(emp => emp.id === id);
        if (index !== -1) {
          this.allEmployees.splice(index, 1);
          this.allEmployees = [...this.allEmployees];
        } this.searchByName();
        this.onDelete = true;
        this.currentUser = id
        this.ngxLoader.start()
        setTimeout(() => {
          this.onDelete = false;
        }, 1000);
        this.ngxLoader.stop();
      },
      error: (error) => {
        console.error('Delete failed', error);
      }
    });
  }

  reset() {
    this.currentPage = 1;
    this.searchText = '';
    this.searchByName();
    this.focusSearchInput();
  }

  close() {
    this.searchText = '';
    this.searchByName();
  }
}