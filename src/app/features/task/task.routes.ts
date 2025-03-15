import { Routes } from '@angular/router';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskComponent } from './pages/task/task.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';

export const taskRoutes: Routes = [
    {
        path: '',
        component: TasksComponent,
    },
    {
        path: 'add',
        component: AddTaskComponent,
    },
    {
        path: ':id',
        component: TaskComponent,
    }
];
