import { Component, computed, inject, signal } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { Button } from 'primeng/button';
import { Textarea } from 'primeng/textarea';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Employee, TaskPayload } from '../../types/task';
import { catchError, tap, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { minWordValidator } from '../../validators/four-word.validator';

@Component({
  selector: 'app-add-task',
    imports: [
        InputText,
        DropdownModule,
        Select,
        DatePicker,
        Button,
        Textarea,
        ReactiveFormsModule,
        FormsModule,
    ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
    _taskService = inject(TaskService);
    _messageService = inject(MessageService);
    _router = inject(Router);

    priorities = this._taskService.getPriorities();
    departments = this._taskService.getDepartments();
    employees = this._taskService.getEmployees();
    statuses = this._taskService.getStatuses();

    departmentEmployees = computed(() => {
        return this.employees.value()?.filter((employee: Employee) =>
            employee.department.id === this.department_id()
        );
    });

    today = signal(new Date());
    isDepartmentSelected = signal(false);
    department_id = signal(0);

    addTaskForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(225)]),
        description: new FormControl('', [Validators.minLength(2), Validators.maxLength(225), minWordValidator(4)]),
        due_date: new FormControl(new Date(this.today().getTime() + 24 * 60 * 60 * 1000), [Validators.required]),        status_id: new FormControl(1, [Validators.required]),
        employee_id: new FormControl('', [Validators.required]),
        priority_id: new FormControl(2, [Validators.required]),
    })

    onDepartmentChange(event: any) {
        this.isDepartmentSelected.set(!!event.value);
        this.department_id.set(event.value);
    }

    addTask() {
        if (this.addTaskForm.invalid) {
            return;
        }

        const {
            name,
            description,
            due_date,
            status_id,
            employee_id,
            priority_id
        } = this.addTaskForm.value as {
            name: string,
            description: string,
            due_date: Date,
            status_id: number,
            employee_id: string,
            priority_id: number
        };

        const taskPayload: TaskPayload = {
            name,
            description,
            due_date : new Date(due_date).toISOString().split('T')[0],
            status_id : status_id.toString(),
            employee_id,
            priority_id : priority_id.toString()
        }

        console.log(taskPayload);

        this._taskService.addTask(taskPayload).pipe(
            tap(() => {
                this._messageService.add({
                    severity: 'success',
                    summary: 'წარმატება',
                    detail: 'ახალი დავალება დამატებულია',
                    });

                this._router.navigate(['/tasks']).then();
            }),
            catchError((err) => {
                this._messageService.add({
                    severity: 'error',
                    summary: 'შეცდომა',
                    detail: 'ახალი დავალება ვერ დაემატა',
                });

                return throwError(() => err);
            })
        ).subscribe();
    }

}
