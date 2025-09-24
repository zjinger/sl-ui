import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlLayoutModule } from 'ngx-sl-ui/layout';

@Component({
  selector: 'app-layout',
  imports: [SlLayoutModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.less',
})
export class LayoutComponent {}
