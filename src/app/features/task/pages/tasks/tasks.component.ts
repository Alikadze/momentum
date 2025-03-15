import { Component, inject } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { TaskService } from '../../services/task.service';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-tasks',
    imports: [
        DropdownModule,
        Select
    ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
    _taskService = inject(TaskService);

    tasks = this._taskService.getTasks();
}
