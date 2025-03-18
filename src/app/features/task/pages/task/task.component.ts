import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Comment, Task } from '../../types/task';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-task',
    imports: [
        AsyncPipe,
        DatePipe,
        Select,
        FormsModule
    ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
    _route = inject(ActivatedRoute);
    _taskService = inject(TaskService);
    _messageService = inject(MessageService);

    taskId!: string;

    task$!: Observable<Task>;
    comments$!: Observable<Comment>;

    statuses = this._taskService.getStatuses();

    selectedStatus!: string;

    onStatusChange(event: any) {
        console.log('Event received:', event);

        // Check if event is an object with a value property or if it's a direct value
        this.selectedStatus = event && typeof event === 'object' ? event.value : event;

        console.log('Selected status:', this.selectedStatus);

        if (!this.selectedStatus) {
            this._messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No status selected'
            });
            return;
        }

        this._taskService.changeTaskStatus(this.taskId, this.selectedStatus).pipe(
            tap((response) => {
                console.log('Success response:', response);
                this._messageService.add({
                    severity: 'success',
                    summary: 'წარმატება',
                    detail: 'დავალების სტატუსი შეიცვალა'
                });
            }),
            catchError((err) => {
                console.error('Error updating task status:', err);
                this._messageService.add({
                    severity: 'error',
                    summary: 'შეცდომა',
                    detail: 'დავალების სტატუსის შეცვლა ვერ ხერხდება'
                });

                return throwError(() => err);
            })
        ).subscribe();
    }

    ngOnInit() {
        this.taskId = this._route.snapshot.params['id'];
        this.task$ = this._taskService.getTask(this.taskId);
        this.comments$ = this._taskService.getComments(this.taskId);
    }
}
