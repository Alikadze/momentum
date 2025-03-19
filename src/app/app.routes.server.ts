import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
    {
    path: '**',
    renderMode: RenderMode.Prerender
    },
    {
        path: 'tasks/:id',
        renderMode: RenderMode.Client
    }
];
