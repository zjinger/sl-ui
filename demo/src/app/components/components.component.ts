import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlLayoutModule } from 'ngx-sl-ui/layout';
import { SlMenuModule, SlMenuNode } from 'ngx-sl-ui/menu';

@Component({
  selector: 'app-components',
  imports: [RouterModule, SlLayoutModule, SlMenuModule],
  templateUrl: './components.component.html',
  styleUrl: './components.component.less'
})
export class ComponentsComponent {
  current = 'dashboard';
  openKeys = [];

  menuData: SlMenuNode[] = [
    { type: 'item', key: 'dashboard', label: 'Dashboard', icon: 'grid', route: '/components/dashboard' },
    { type: 'item', key: 'button', label: 'Button', icon: 'grid', route: '/components/button' },
    { type: 'item', key: 'input', label: 'Input', icon: 'grid', route: '/components/input' },
    { type: 'item', key: 'menu', label: 'Menu', icon: 'grid', route: '/components/menu' },
    {
      type: 'sub',
      key: 'products',
      label: 'Products',
      icon: 'bag',
      defaultOpen: true,
      children: [
        {
          type: 'sub',
          key: 'published',
          label: 'Published',
          children: [
            {
              type: 'item',
              key: 'all',
              label: 'All items'
            }
          ]
        }
      ]
    },
    // { type: 'divider' },
    { type: 'item', key: 'earning', label: 'Earning', icon: 'wallet' }
  ];
}
