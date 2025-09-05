import { Routes } from '@angular/router';

export const MOVEMENT_ROUTES: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./Pages/movimientos/movimientos').then(m => m.Movimientos) 
  }
];