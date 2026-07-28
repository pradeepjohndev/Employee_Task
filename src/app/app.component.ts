import { Component } from '@angular/core';
import { EmployeeDisplayComponent } from './Screens/Components/employee-display/employee-display.component';
import { EmployeeFormComponent } from './Screens/Components/employee-form/employee-form.component';
import { EmployeeTableComponent } from './Screens/employee-table/employee-table.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
