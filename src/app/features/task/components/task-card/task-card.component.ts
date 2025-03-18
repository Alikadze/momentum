import { Component, input } from '@angular/core';
import { DatePipe, SlicePipe } from "@angular/common";
import { DepartmentNamePipe } from "../../pipes/department-name.pipe";
import { Task } from '../../types/task';

@Component({
  selector: 'app-task-card',
    imports: [
        DatePipe,
        DepartmentNamePipe,
        SlicePipe
    ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
    task = input<Task>();
    interfaceColor = input<string>();
}
