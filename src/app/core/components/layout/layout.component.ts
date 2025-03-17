import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select } from 'primeng/select';
import { EmployeePayload } from '../../types/employee';
import { catchError, tap, throwError } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';
import { MessageService } from 'primeng/api';
import { TaskService } from '../../../features/task/services/task.service';
import { NgIf } from '@angular/common';
import { AddEmployeeDialogService } from '../../services/add-employee-dialog.service';

@Component({
  selector: 'app-layout',
    imports: [
        RouterOutlet,
        HeaderComponent,
        Dialog,
        Button,
        InputText,
        ReactiveFormsModule,
        Select,
    ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
    _employeeService = inject(EmployeeService);
    _messageService = inject(MessageService);
    _addEmployeeDialogService = inject(AddEmployeeDialogService);
    _taskService = inject(TaskService);

    departments = this._taskService.getDepartments();
    dialogVisible: boolean = false;
    selectedFile: File | null = null;
    previewImage: string | null = null;


    constructor() {
        this._addEmployeeDialogService.openDialog$.subscribe(() => {
            this.openDialog();
        });
    }

    openDialog() {
        this.dialogVisible = true;
    }

    closeDialog() {
        this.dialogVisible = false;
        this.resetForm();
    }

    resetForm() {
        this.addEmployeeForm.reset();
        this.selectedFile = null;
        this.previewImage = null;
    }


    alphabetPattern = /^[ა-ჰa-zA-Z]+$/;

    addEmployeeForm = new FormGroup({
        name: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(225),
            Validators.pattern(this.alphabetPattern)
        ]),
        surname: new FormControl('', [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(225),
            Validators.pattern(this.alphabetPattern)
        ]),
        avatar: new FormControl(null, [Validators.required]),
        department_id: new FormControl('', [Validators.required]),
    });

    onFileSelected(event: any) {
        if (event.target && event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];

            if (!file.type.match('image.*')) {
                this._messageService.add({
                    severity: 'error',
                    summary: 'Invalid file',
                    detail: 'Please select an image file',
                });
                return;
            }

            this.selectedFile = file;

            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.previewImage = e.target.result;
                this.addEmployeeForm.patchValue({
                    avatar: file
                });
                this.addEmployeeForm.get('avatar')?.updateValueAndValidity();
            };
            reader.readAsDataURL(file);
        }
    }

    deleteImage() {
        this.selectedFile = null;
        this.previewImage = null;
        this.addEmployeeForm.patchValue({
            avatar: null
        });
        this.addEmployeeForm.get('avatar')?.updateValueAndValidity();
    }

    addEmployee() {
        if (this.addEmployeeForm.invalid) {
            this._messageService.add({
                severity: 'error',
                summary: 'შეცდომა',
                detail: 'შეავსეთ ყველა ველი',
            })

            return;
        }

        const formData = new FormData();

        const {
            name,
            surname,
            department_id
        } = this.addEmployeeForm.value as {
            name: string,
            surname: string,
            department_id: string,
        };


        formData.append('name', name);
        formData.append('surname', surname);
        formData.append('department_id', department_id);
        if (this.selectedFile) {
            formData.append('avatar', this.selectedFile);
        }

        this._employeeService.addEmployeeWithFormData(formData)
            .pipe(
                tap(() => {
                    this._messageService.add({
                        severity: 'success',
                        summary: 'წარმატება',
                        detail: 'თანამშრომელი დამატებულია',
                    });
                    this._addEmployeeDialogService.notifyEmployeeAdded();
                    this.closeDialog();
                }),
                catchError((error) => {
                    this._messageService.add({
                        severity: 'error',
                        summary: 'შეცდომა',
                        detail: 'თანამშრომლის დამატება ვერ ხერხდება',
                    });

                    return throwError(() => error);
                })
            )
            .subscribe();
    }
}
