import { Routes } from '@angular/router';

export const PRODUCT_ROUTES: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./Pages/productos/productos').then(m => m.ProductosComponent) 
  }
];