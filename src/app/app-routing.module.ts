import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeTableComponent } from './Screens/employee-table/employee-table.component';
import { EmployeeTodoComponent } from './Screens/employee-todo/employee-todo.component';
const routes: Routes = [
  {
    path: 'users',
    component: EmployeeTableComponent
  },
  {
    path: 'Emplist',
    component: EmployeeTodoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
