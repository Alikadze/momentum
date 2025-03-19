import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Comment, CommentPayload, Task } from '../../types/task';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Textarea } from 'primeng/textarea';
import { Button } from 'primeng/button';
import { CommentCardComponent } from '../../components/comment-card/comment-card.component';

@Component({
  selector: 'app-task',
    imports: [
        AsyncPipe,
        DatePipe,
        Select,
        FormsModule,
        Textarea,
        Button,
        CommentCardComponent
    ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
    _route = inject(ActivatedRoute);
    _taskService = inject(TaskService);
    _messageService = inject(MessageService);

    taskId!: number;

    task$!: Observable<Task>;
    comments$!: Observable<Comment[]>;

    newComment!: string;

    statuses = this._taskService.getStatuses();

    selectedStatus!: string;
    isSubComTextareaVisible!: boolean;
    isAddComLoading!: boolean;

    isSubComVisible(event: any) {
        this.isSubComTextareaVisible = true;
    }

    ngOnInit() {
        this.taskId = this._route.snapshot.params['id'];
        this.loadTasks();
        this.loadComments();
    }

    loadTasks() {
        this.task$ = this._taskService.getTask(this.taskId);
    }

    loadComments() {
        this.comments$ = this._taskService.getComments(this.taskId)
    }
    onStatusChange(event: any) {
        this.selectedStatus = event && typeof event === 'object' ? event.value : event;

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

    addComment() {
        this.isAddComLoading = true;

        if (!this.newComment?.trim() || this.newComment?.trim() === '') {
            this.isAddComLoading = false;
            this._messageService.add({
                severity: 'error',
                summary: 'შეცდომა',
                detail: 'გთხოვთ შეავსოთ კომენტარი',
            });

            return;
        }

        const commentPayload: CommentPayload = {
            text: this.newComment,
            task_id: this.taskId,
        }

        this._taskService.addComment(commentPayload).pipe(
            tap((response) => {
                console.log('Success response:', response);
                this._messageService.add({
                    severity: 'success',
                    summary: 'წარმატება',
                    detail: 'კომენტარი დაემატა'
                });
                this.newComment = '';
                this.loadComments();
                this.isAddComLoading = false;
            }),
            catchError((err) => {
                console.error('Error adding comment:', err);
                this._messageService.add({
                    severity: 'error',
                    summary: 'შეცდომა',
                    detail: 'კომენტარის დამატება ვერ ხერხდება'
                });
                this.isAddComLoading = false;

                return throwError(() => err);
            })
        ).subscribe();
    }
}
