import { Component, computed, inject, OnChanges, SimpleChanges } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { TaskService } from '../../services/task.service';
import { Select } from 'primeng/select';
import { DepartmentNamePipe } from '../../pipes/department-name.pipe';
import { DatePipe, SlicePipe } from '@angular/common';
import { MultiSelect } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
    imports: [
        DropdownModule,
        Select,
        DepartmentNamePipe,
        DatePipe,
        SlicePipe,
        MultiSelect,
        FormsModule,
    ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
    _taskService = inject(TaskService);

    tasks = this._taskService.getTasks();

    departments = this._taskService.getDepartments();
    priorities = this._taskService.getPriorities();
    statuses = this._taskService.getStatuses();

    selectedDepartments: any[] = [];


    toDoTasks = computed(() =>
        this.tasks.value()?.filter(
            task => task.status.id === 1
        )
    );

    inProgressTasks = computed(() =>
        this.tasks.value()?.filter(
            task => task.status.id === 2
        )
    );

    testingTasks = computed(() =>
        this.tasks.value()?.filter(
            task => task.status.id === 3
        )
    );

    doneTasks = computed(() =>
        this.tasks.value()?.filter(
            task => task.status.id === 4
        )
    );


}
