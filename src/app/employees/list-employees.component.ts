import { Component, OnInit } from '@angular/core';
// import Employee Model
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';

@Component({
  // selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  // Hard code the employee data. In a later video we will discuss

  // how to retrieve this employees data from a database table
  employees: Employee[];
  searchTerm: string;


  constructor(private _employeeService: EmployeeService, private _router: Router) { }

  ngOnInit() {
    this.employees = this._employeeService.getEmployees();

  }

  onClick(employeeId: number) {
    this._router.navigate(['/employees',employeeId]);
  }

  changeEmployeeName() {
    // this.employees[0].name = 'Steve';
    const newEmployeeArray: Employee[] = Object.assign([], this.employees);
    newEmployeeArray[0].name = 'Steve';
    this.employees = newEmployeeArray;
  }
}