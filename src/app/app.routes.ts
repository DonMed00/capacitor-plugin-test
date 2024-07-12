import { Routes } from '@angular/router';
import { PhotoViewerComponent } from './photo-viewer/photo-viewer.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'photo-viewer',
    loadComponent: () =>
      import('.//photo-viewer/photo-viewer.component').then(
        (m) => m.PhotoViewerComponent
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
