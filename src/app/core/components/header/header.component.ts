import { Component, EventEmitter, inject, Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { isPlatformBrowser } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { MessageService } from 'primeng/api';
import { EmployeePayload } from '../../types/employee';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-header',
    imports: [
        Button,
        RouterLink,
    ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
    @Output() openDialogEvent = new EventEmitter<void>();

    openDialog() {
        this.openDialogEvent.emit();
    }
}
