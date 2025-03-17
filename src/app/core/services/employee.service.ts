import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Employee, EmployeePayload } from '../types/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
    API_URL = environment.apiURL;
    _http = inject(HttpClient);

    addEmployee(employeePayload: EmployeePayload) {
        return this._http.post<Employee>(
            `${this.API_URL}employees`,
            employeePayload
        )
    }

    addEmployeeWithFormData(formData: FormData) {
        return this._http.post(`${this.API_URL}employees`, formData);
    }
}
