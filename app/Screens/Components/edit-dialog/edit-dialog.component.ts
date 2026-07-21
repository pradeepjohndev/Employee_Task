import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EmployeeTableComponent } from '../../employee-table/employee-table.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {
  employee: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<EditDialogComponent>) {
    this.employee = data.employee;
  }

  updateEmployee(form: NgForm) {
    if (
      form.invalid ||
      this.employee.age < 18 ||
      this.employee.age > 90
    ) {
      return;
    }
    this.dialogRef.close(this.employee);
  }
}
