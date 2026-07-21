import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
import { EditDialogComponent } from 'src/app/Screens/Components/edit-dialog/edit-dialog.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private dialog: MatDialog,
    private sharedService: SharedServiceService) {}
  openAddDialog() {

    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '1000px',
      data: {
        mode: 'add',
        employee: {
          id: null,
          firstName: '',
          lastName: '',
          age: null,
          email: '',
          phone: '',
          role: '',
          address: {
            country: ''
          }
        }
      }
    });

    dialogRef.afterClosed().subscribe(newEmployee => {
      if (!newEmployee) {
        return;
      }
      this.sharedService.addEmployee(newEmployee);
    });

  }
}
