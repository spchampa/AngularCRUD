import { Component, OnInit } from '@angular/core';
// import Employee Model
import { Employee } from '../models/employee.model';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private _router: Router, private _route: ActivatedRoute) {
    this.employees = this._route.snapshot.data['employeeList'];
    if (this._route.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  onDeleteNotification(id: number) {
    const i = this.filteredEmployees.findIndex(e => e.id === id);
    if (i !== -1) {
      this.filteredEmployees.splice(i, 1);
    }
  }

  ngOnInit() {

  }
}