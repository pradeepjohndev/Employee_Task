
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { EmployeeFormComponent } from './Screens/Components/employee-form/employee-form.component';
import { EmployeeDisplayComponent } from './Screens/Components/employee-display/employee-display.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeTableComponent } from './Screens/employee-table/employee-table.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './Layout/navbar/navbar.component';
import { EmployeeTodoComponent } from './Screens/employee-todo/employee-todo.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { EditDialogComponent } from './Screens/Components/edit-dialog/edit-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeFormComponent,
    EmployeeDisplayComponent,
    EmployeeTableComponent,
    NavbarComponent,
    EmployeeTodoComponent,
    FooterComponent,
    EditDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    CdkTableModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule
  ],
  entryComponents: [
    EditDialogComponent
  ],
  providers: [{provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig}],
  bootstrap: [AppComponent]
})
export class AppModule { }