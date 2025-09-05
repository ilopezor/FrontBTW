import { Routes } from '@angular/router';

export const CATEGORY_ROUTES: Routes = [

  { 
    path: '', 
    loadComponent: () => import('./Pages/categoria/categoria').then(m => m.Categoria) 
  }
];