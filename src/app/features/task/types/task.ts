import { Employee } from '../../../core/types/employee';

export interface Task {
    id: number;
    name: string;
    description: string;
    due_date: string;
    status: Status;
    priority: Priority;
    department: Department;
    employee: Employee;
    total_comments: number;
}

export interface TaskPayload {
    name: string;
    description: string;
    due_date: string;
    status_id: string;
    employee_id: string;
    priority_id: string;
}

export interface Status {
    id: number;
    name: string;
}

export interface Priority {
    id: number;
    name: string;
    icon: string;
}

export interface Department {
    id: number;
    name: string;
}
