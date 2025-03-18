import { inject, Injectable } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Comment, CommentPayload, Department, Priority, Status, Task, TaskPayload } from '../types/task';
import { Employee } from '../../../core/types/employee';

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
        return this._http.get<Task>(
            `${this.apiURL}tasks/${id}`
        )
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
        return this._http.get<Employee[]>(this.apiURL + 'employees')
    }

    getStatuses() {
        return httpResource<Status[]>({
            method: 'GET',
            url: this.apiURL + 'statuses'
        })
    }

    getComments(task_id: string) {
        return this._http.get<Comment>(
            `${this.apiURL}tasks/${task_id}/comments`
        )
    }

    addComment(commentPayload: CommentPayload) {
        return this._http.post<Comment>(
            `${this.apiURL}tasks/${commentPayload.task_id}/comments`,
            commentPayload
        )
    }

    changeTaskStatus(id: string, status_id: string) {
        return this._http.put<Task>(
            `${this.apiURL}tasks/${id}`,
            { status_id }  // Send as a proper JSON object
        )
    }
}
