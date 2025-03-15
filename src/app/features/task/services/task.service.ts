import { inject, Injectable } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Department, Employee, Priority, Status, Task, TaskPayload } from '../types/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    apiURL = environment.apiURL;
    _http = inject(HttpClient);

    getTasks()  {
        return httpResource<Task[]>({
            method: 'GET',
            url: this.apiURL + 'tasks'
        })
    }

    getTask(id: string) {
        return httpResource<Task>({
            method: 'GET',
            url: this.apiURL + 'tasks/' + id
        })
    }

    addTask(task: TaskPayload) {
        return this._http.post<Task>(
            `${this.apiURL}tasks`,
            task
        )
    }

    updateTask(id: number, status_id: string) {
        return httpResource<Task>({
            method: 'PUT',
            url: this.apiURL + 'tasks/' + id,
            body: status_id
        })
    }

    getDepartments() {
        return httpResource<Department[]>({
            method: 'GET',
            url: this.apiURL + 'departments'
        })
    }

    getPriorities() {
        return httpResource<Priority[]>({
            method: 'GET',
            url: this.apiURL + 'priorities'
        })
    }

    getEmployees() {
        return httpResource<Employee[]>({
            method: 'GET',
            url: this.apiURL + 'employees'
        })
    }

    getStatuses() {
        return httpResource<Status[]>({
            method: 'GET',
            url: this.apiURL + 'statuses'
        })
    }
}
