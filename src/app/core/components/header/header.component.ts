import { Component, EventEmitter, Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
    imports: [
        Button,
        RouterLink,
        Dialog,
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
