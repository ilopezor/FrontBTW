import { Routes } from '@angular/router';
import { Home } from './Shared/Pages/home/home';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./features/Productos/products.routes').then(m => m.PRODUCT_ROUTES),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./features/Categoria/categoria.routes').then(m => m.CATEGORY_ROUTES),
  },
  {
    path: 'movements',
    loadChildren: () =>
      import('./features/Movimientos/movimientos.routes').then(m => m.MOVEMENT_ROUTES),
  }
];
