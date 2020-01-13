import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';



@Injectable()
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}


  baseUrl = 'http://localhost:3000/employees';

  private handleError(errorResponse: HttpErrorResponse) {
    if(errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error.message);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }
    // return new ErrorObservable('There is a problem with the service. We are notified and working on it. Please try again later.');
    // Part 66. This ^^ commented code does not work in angular 8.
  }

  getEmployees(): Observable<Employee[]> {
      return this.httpClient.get<Employee[]>(this.baseUrl);
          // .pipe(catchError(this.handleError));
          // Part 66. This ^^ commented code does not work in angular 8.
  }

  getEmployee(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`);
      //.pipe(catchError(this.handleError));
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.baseUrl, employee, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    //.pipe(catchError(this.handleError));
  }

  updateEmployee(employee: Employee): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
    //.pipe(catchError(this.handleError));
  }

  deleteEmployee(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
        //.pipe(catchError(this.handleError));
  }

}