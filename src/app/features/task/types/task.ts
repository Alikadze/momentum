export interface Task {
    id: number;
    name: string;
    description: string;
    due_date: string;
    status: Status;
    priority: Priority;
    department: Department;
    employee: Employee;
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

export interface Employee {
    id: number;
    name: string;
    surname: string;
    avatar: string;
    department: Department;
}
