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
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-tasks',
    imports: [
        DropdownModule,
        MultiSelect,
        FormsModule,
        Select,
        TaskCardComponent,
        RouterLink,
        Tag,
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

    selectedDepartments = signal<number[]>([]);
    selectedPriorities = signal<number[]>([]);
    selectedEmployee = signal<number | null>(null);

    tempSelectedDepartments = signal<number[]>([]);
    tempSelectedPriorities = signal<number[]>([]);
    tempSelectedEmployee = signal<number | null>(null);

    applyFilters() {
        this.selectedDepartments.set(this.tempSelectedDepartments());
        this.selectedPriorities.set(this.tempSelectedPriorities());
        this.selectedEmployee.set(this.tempSelectedEmployee());
    }

    toDoTasks = computed(() => {
        return this.tasks.value()?.filter(task => {
            if (task.status.id !== 1) return false;

            return (
                (this.selectedDepartments().length === 0 || this.selectedDepartments().includes(task.department.id)) &&
                (this.selectedPriorities().length === 0 || this.selectedPriorities().includes(task.priority.id)) &&
                (this.selectedEmployee() === null || this.selectedEmployee() === task.employee.id) // Single select fix
            );
        });
    });

    inProgressTasks = computed(() => {
        return this.tasks.value()?.filter(task => {
            if (task.status.id !== 2) return false;

            return (
                (this.selectedDepartments().length === 0 || this.selectedDepartments().includes(task.department.id)) &&
                (this.selectedPriorities().length === 0 || this.selectedPriorities().includes(task.priority.id)) &&
                (this.selectedEmployee() === null || this.selectedEmployee() === task.employee.id) // Single select fix
            );
        });
    });


    testingTasks = computed(() => {
        return this.tasks.value()?.filter(task => {
            if (task.status.id !== 3) return false;

            return (
                (this.selectedDepartments().length === 0 || this.selectedDepartments().includes(task.department.id)) &&
                (this.selectedPriorities().length === 0 || this.selectedPriorities().includes(task.priority.id)) &&
                (this.selectedEmployee() === null || this.selectedEmployee() === task.employee.id) // Single select fix
            );
        });
    });

    doneTasks = computed(() => {
        return this.tasks.value()?.filter(task => {
            if (task.status.id !== 4) return false;

            return (
                (this.selectedDepartments().length === 0 || this.selectedDepartments().includes(task.department.id)) &&
                (this.selectedPriorities().length === 0 || this.selectedPriorities().includes(task.priority.id)) &&
                (this.selectedEmployee() === null || this.selectedEmployee() === task.employee.id) // Single select fix
            );
        });
    });
}
