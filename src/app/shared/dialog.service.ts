import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditDialogComponent } from '../Screens/Components/edit-dialog/edit-dialog.component';
import { ConfirmationDialogComponent } from '../Screens/Components/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openEmployeeDialog(mode: 'add' | 'edit', width: string, employee?: any) {
    return this.dialog.open(EditDialogComponent, {
      width: width,
      disableClose: true,
      data: {
        mode,
        employee
      }
    });
  }

  openConfirmationDialog(width: string, data: any) {
    return this.dialog.open(ConfirmationDialogComponent, {
      width: width,
      disableClose: true,
      data: data
    });
  }
}
