import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { SharedServiceService } from 'src/app/shared/shared-service.service';
import { EditDialogComponent } from 'src/app/Screens/Components/edit-dialog/edit-dialog.component';
import { DialogService } from 'src/app/shared/dialog.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() menuClick: EventEmitter<void> = new EventEmitter<void>();

  toggleSidebar() {
    this.menuClick.emit();
  }
  constructor(private dialogservice: DialogService,
    private sharedService: SharedServiceService) { }

  openAddDialog() {
    const dialogRef =
      this.dialogservice.openEmployeeDialog(
        'add',
        '1000px',
        {
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
      );

    dialogRef.afterClosed().subscribe(newEmployee => {
      if (!newEmployee) {
        return;
      }
      this.sharedService.addEmployee(newEmployee);
    });
  }

}

