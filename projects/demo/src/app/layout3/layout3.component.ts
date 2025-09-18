import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlLayoutModule } from '@sl-ui/layout';
@Component({
  selector: 'app-layout3',
  imports: [SlLayoutModule, RouterModule],
  templateUrl: './layout3.component.html',
  styleUrl: './layout3.component.less',
})
export class Layout3Component {}
