import { Component } from '@angular/core';
import { EmployeeDisplayComponent } from './Screens/employee-display/employee-display.component';
import { EmployeeFormComponent } from './Screens/employee-form/employee-form.component';
import { EmployeeTableComponent } from './Screens/employee-table/employee-table.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
