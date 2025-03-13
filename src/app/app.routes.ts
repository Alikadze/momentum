import { Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tasks',
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'tasks',
                loadChildren: () => import('./features/task/task.routes').then(m => m.taskRoutes)
            }
        ]
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'tasks'
    }
];
