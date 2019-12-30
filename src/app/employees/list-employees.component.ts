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
  filteredEmployees: Employee[];


  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filtereEmployees(value);
  }

  filtereEmployees(searchString: string) {
    return this.employees.filter(employee =>
      employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  constructor(private _employeeService: EmployeeService, private _router: Router) { }

  ngOnInit() {
    this.employees = this._employeeService.getEmployees();
    this.filteredEmployees = this.employees;
  }

  onClick(employeeId: number) {
    this._router.navigate(['/employees',employeeId]);
  }

  changeEmployeeName() {
    this.employees[0].name = 'Jordan';
    this.filteredEmployees = this.filtereEmployees(this.searchTerm);
    // const newEmployeeArray: Employee[] = Object.assign([], this.employees);
    // newEmployeeArray[0].name = 'Jordan';
    // this.employees = newEmployeeArray;
  }

  onMouseMove() {

  }


}