import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-layout',
    imports: [
        RouterOutlet,
        HeaderComponent,
        Dialog,
        Button
    ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
    dialogVisible: boolean = false;

    openDialog() {
        this.dialogVisible = true;
    }
}
