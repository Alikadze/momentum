import { Component, computed, inject, OnChanges, OnInit, signal, SimpleChanges, ViewChild } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { TaskService } from '../../services/task.service';
import { Select } from 'primeng/select';
import { DepartmentNamePipe } from '../../pipes/department-name.pipe';
import { DatePipe, SlicePipe } from '@angular/common';
import { MultiSelect } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { Employee } from '../../../../core/types/employee';

@Component({
  selector: 'app-tasks',
    imports: [
        DropdownModule,
        DepartmentNamePipe,
        DatePipe,
        SlicePipe,
        MultiSelect,
        FormsModule,
        Select,
    ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
    _taskService = inject(TaskService);

    tasks = this._taskService.getTasks();

    departments = this._taskService.getDepartments();
    priorities = this._taskService.getPriorities();
    employees = signal<Employee[]>([]);

    @ViewChild('employeeDropdown') employeeDropdown: any;

    onEmployeeChange(event: any) {
        // Prevent automatic closing by reopening after a small delay
        setTimeout(() => {
            if (this.employeeDropdown) {
                this.employeeDropdown.show();
            }
        });
    }

    ngOnInit() {
        this.loadEmployees();
    }

    loadEmployees() {
        this._taskService.getEmployees().subscribe({
            next: (employees) => {
                this.employees.set(employees); // Update the signal with new employees
            },
            error: (err) => {
            }
        });
    }

    selectedDepartments: any[] = [];
    selectedPriorities: any[] = [];
    selectedEmployee: any[] = [];


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
