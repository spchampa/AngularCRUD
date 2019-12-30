import { PipeTransform, Pipe } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';


@Pipe({
    name: 'employeeFilter',
    pure: false
})
export class EmployeeFilterPipe implements PipeTransform {
    private counter = 0;
    transform(employees: Employee[], searchTerm: string): Employee[] {
        this.counter++;
        console.log('Filter pipe execute count ' + this.counter);
        if (!employees || !searchTerm) {
            return employees
        }

        return employees.filter(employee =>
            employee.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}