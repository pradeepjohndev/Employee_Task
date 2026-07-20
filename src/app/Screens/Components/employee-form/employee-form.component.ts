import { EmployeeServicesService } from 'src/app/service/employee-services.service';
import { Component, OnInit } from '@angular/core';
import { Emp } from 'src/app/Interface/Employee';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})

export class EmployeeFormComponent implements OnInit {
  employee: Emp = {
    id: null,
    name: '',
    age: null,
    phone: null,
    location: ''
  };

  isEdit = false;
  editingIndex!: number;
  empForm!: NgForm;

  constructor(private employeeService: EmployeeServicesService) { }

  ngOnInit(): void {
    this.employeeService.selectedEmployee.subscribe((value) => {
      this.employee = value.employee;
      this.editingIndex = value.index;
      this.isEdit = true;
    });

    this.employeeService.employeeDeleted.subscribe((deletedIndex) => {
      if (this.isEdit && this.editingIndex === deletedIndex) {
        this.clearForm();
        this.isEdit = false
      }
    })
  }

  addEmployee(form: NgForm) {
    const { id, age, phone } = this.employee;

    if (form.invalid) {
      alert('Please fill all the required fields correctly');
      return;
    }

    if (age !== null && (age <= 18 || age >= 90)) {
      alert('age must be between 18 and 90');
      return;
    }

    if (!phone || phone.toString().length !== 10) {
      alert('Phone number must be exactly 10 digits');
      return;
    }

    if (id !== null && this.employeeService.isExist(id)) {
      alert('An employee already exists with this ID');
      return;
    }

    this.employeeService.addEmp({ ...this.employee });
    form.resetForm();
  }

  updateEmployee() {
    this.employeeService.editEmp(this.editingIndex, { ...this.employee });
    this.isEdit = false;
    this.clearForm();
  }

  clearForm() {
    this.employee = {
      id: null,
      name: '',
      age: null,
      phone: null,
      location: ''
    };
  }
}
