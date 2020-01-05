import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})

export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm', null) public createEmployeeForm: NgForm;

  datePickerConfig: Partial<BsDatepickerConfig>;
  employee: Employee;
  panelTitle: string;

  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' },
    { id: 5, name: 'Admin' }
  ];

  constructor(private _employeeService: EmployeeService,
              private _router: Router, private _route: ActivatedRoute) { 
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        dateInputFormat: 'DD/MM/YYYY'
      });
  }

  // gender = 'male'; // initializes the male radio button to checked.
  // isActive = true; // initializes the form to hace the isactive checkbox checked. (when it is ngform)
  // department = '3'; // initializes the department as IT in the ngform.
  previewPhoto = false;
  
  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    });
  }

  private getEmployee(id: number) {
    if (id === 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        contactPreference: null,
        phoneNumber: null,
        email: null,
        dateOfBirth: null,
        department: "select",
        isActive: null,
        photoPath: null
      };
      this.panelTitle = "Create Employee";
      this.createEmployeeForm.reset();
    } else {
      this.panelTitle = "Edit Employee";
      this.employee = Object.assign({} ,this._employeeService.getEmployee(id));
    }
  }

  saveEmployee(): void {
    const newEmployee: Employee = Object.assign({}, this.employee);
    this._employeeService.save(newEmployee);
    this.createEmployeeForm.reset();
    this._router.navigate(['list']);
  }
}
