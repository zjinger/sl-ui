import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'layout3',
    pathMatch: 'full',
  },
  {
    path: 'layout',
    loadComponent: () =>
      import('./layout/layout.component').then((m) => m.LayoutComponent),
  },
  {
    path: 'layout2',
    loadComponent: () =>
      import('./layout2/layout2.component').then((m) => m.Layout2Component),
  },
  {
    path: 'layout3',
    loadComponent: () =>
      import('./layout3/layout3.component').then((m) => m.Layout3Component),
  },
  {
    path: 'button',
    loadComponent: () =>
      import('./button/button.component').then((m) => m.ButtonComponent),
  },
  {
    path: 'map',
    loadComponent: () =>
      import('./map/map.component').then((m) => m.MapComponent),
  },
  {
    path: 'menu',
    loadComponent: () =>
      import('./menu/menu.component').then((m) => m.MenuComponent),
  },
];
