import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlLayoutModule } from 'ngx-sl-ui/layout';

@Component({
  selector: 'app-layout2',
  imports: [SlLayoutModule, RouterModule],
  templateUrl: './layout2.component.html',
  styleUrl: './layout2.component.less',
})
export class Layout2Component {}
