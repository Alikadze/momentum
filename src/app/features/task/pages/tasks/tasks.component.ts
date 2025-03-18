import { Component, computed, inject, OnChanges, OnInit, signal, SimpleChanges, ViewChild } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { TaskService } from '../../services/task.service';
import { Select } from 'primeng/select';
import { MultiSelect } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { Employee } from '../../../../core/types/employee';
import { AddEmployeeDialogService } from '../../../../core/services/add-employee-dialog.service';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
    imports: [
        DropdownModule,
        MultiSelect,
        FormsModule,
        Select,
        TaskCardComponent,
        RouterLink,
    ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
    _addEmployeeDialogService = inject(AddEmployeeDialogService);
    _taskService = inject(TaskService);

    tasks = this._taskService.getTasks();

    departments = this._taskService.getDepartments();
    priorities = this._taskService.getPriorities();
    employees = signal<Employee[]>([]);

    @ViewChild('employeeDropdown') employeeDropdown: any;

    subscription = new Subscription();

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

        this.subscription.add(
            this._addEmployeeDialogService.employeeAdded$.subscribe(() => {
                // Refresh employees list
                this.loadEmployees();
            })
        );
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
