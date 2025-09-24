import { Component } from '@angular/core';
import { SlButtonModule } from 'ngx-sl-ui/button';

@Component({
  selector: 'app-button',
  imports: [SlButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.less',
})
export class ButtonComponent {}
