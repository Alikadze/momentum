import { Component, inject, input, output } from '@angular/core';
import { Comment, CommentPayload } from '../../types/task';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Textarea } from 'primeng/textarea';
import { TaskService } from '../../services/task.service';
import { catchError, tap, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-comment-card',
    imports: [
        Button,
        FormsModule,
        Textarea
    ],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.scss'
})
export class CommentCardComponent {
    _taskService = inject(TaskService);
    _messageService = inject(MessageService);

    comment = input<Comment>({} as Comment);
    taskId = input<number>(0);
    parentCommentId = input<number>(0);

    subComAdded = output();

    newSubComment: string = '';

    isSubComTextareaVisible = false;
    isAddComLoading = false;

    toggleSubCom() {
        this.isSubComTextareaVisible = !this.isSubComTextareaVisible;
    }

    addSubComment() {
        this.isAddComLoading = true;
        if (!this.newSubComment) {
            this._messageService.add({
                severity: 'error',
                summary: 'შეცდომა',
                detail: 'კომენტარი ცარიელია'
            });
            this.isAddComLoading = false;

            return;
        }

        const commentPayload: CommentPayload = {
            text: this.newSubComment.trim(),
            task_id: this.taskId(),
            parent_id: this.parentCommentId()
        }

        this._taskService.addComment(commentPayload).pipe(
            tap((response) => {
                console.log('Success response:', response);
                this._messageService.add({
                    severity: 'success',
                    summary: 'წარმატება',
                    detail: 'კომენტარი დაემატა'
                });
                this.newSubComment = '';
                this.isSubComTextareaVisible = false;
                this.isAddComLoading = false;
                this.subComAdded.emit();
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
