import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components.component').then(m => m.ComponentsComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'input',
        loadComponent: () => import('./input/input.component').then(m => m.InputComponent)
      },
      {
        path: 'button',
        loadComponent: () => import('./button/button.component').then(m => m.ButtonComponent)
      },
      {
        path: 'menu',
        loadComponent: () => import('./menu/menu.component').then(m => m.MenuComponent)
      },

      {
        path: 'map',
        loadComponent: () => import('./map/map.component').then(m => m.MapComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule {}
