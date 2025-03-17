import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
    API_URL = environment.apiURL;
    _http = inject(HttpClient);

    addEmployee(employeePayload:any) {

    }

}
