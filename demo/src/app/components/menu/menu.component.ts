import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { SlMenuModule, SlMenuNode } from 'ngx-sl-ui/menu';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, SlMenuModule, JsonPipe],
  template: `
    <!-- <sl-menu mode="vertical" [(activeKey)]="current">
      <sl-menu-item key="dashboard" icon="dashboard">Dashboard</sl-menu-item>
      <sl-menu-item key="messages" icon="mail">Messages</sl-menu-item>
      <sl-menu-item key="discover" icon="compass">Discover</sl-menu-item>
      <sl-sub-menu key="products" title="Products" icon="shopping-bag">
        <sl-menu-item key="published">Published</sl-menu-item>
        <sl-sub-menu key="all-items" title="All items">
          <sl-menu-item key="latest">Latest reviews</sl-menu-item>
        </sl-sub-menu>
      </sl-sub-menu>
      <sl-menu-item key="earning" icon="wallet">Earning</sl-menu-item>
    </sl-menu> -->
    <!-- <br /> -->
    <div style="width: 200px;background: #f0f0f0;">
      <!-- <sl-menu
        [slItems]="menuData"
        [(slActiveKey)]="current1"
        [(slOpenKeys)]="openKeys"
      >
      </sl-menu> -->
    </div>
    <p>active = {{ current1 }}</p>
    <p>openKeys = {{ openKeys | json }}</p>
  `,
  styles: ``,
})
export class MenuComponent {
  current = 'dashboard';

  current1 = 'latest';
  openKeys = ['products', 'published']; // 初始展开

  menuData: SlMenuNode[] = [
    { type: 'item', key: 'dashboard', label: 'Dashboard', icon: 'grid' },
    { type: 'item', key: 'messages', label: 'Messages', icon: 'mail' },
    { type: 'item', key: 'discover', label: 'Discover', icon: 'compass' },
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
              label: 'All items',
            },
          ],
        },
      ],
    },
    { type: 'divider' },
    { type: 'item', key: 'earning', label: 'Earning', icon: 'wallet' },
  ];
}
