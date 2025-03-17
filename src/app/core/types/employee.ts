import { Department } from '../../features/task/types/task';

export interface EmployeePayload {
    name: string;
    surname: string;
    avatar: string;
    department_id: number;
}

export interface Employee {
    id: number;
    name: string;
    surname: string;
    avatar: string;
    department: Department;
}
