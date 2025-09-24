import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlButtonComponent } from './sl-button.component';

@NgModule({
  imports: [CommonModule, SlButtonComponent],
  exports: [SlButtonComponent],
})
export class SlButtonModule {}
