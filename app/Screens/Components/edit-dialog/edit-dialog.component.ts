import { SharedServiceService } from 'src/app/shared/shared-service.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {
  employee: any;
  mode: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditDialogComponent>,
    private SharedService: SharedServiceService){
    this.employee = data.employee;
    this.mode = data.mode;
  }

  submitEmployee(form: NgForm) {
    if (form.invalid || this.employee.age < 18 || this.employee.age > 90) {
      return;
    }

    if (this.mode === 'add') {
      const employees = this.SharedService.getEmployees();
      const idExists = employees.some(employee => employee.id === this.employee.id);

      if (idExists) {
        alert('Employee ID already exists');
        return;
      }
    }
    this.dialogRef.close(this.employee);
  }
}
