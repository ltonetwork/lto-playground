import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticComponent } from './static.component';

@NgModule({
  imports: [CommonModule],
  declarations: [StaticComponent],
  exports: [StaticComponent]
})
export class StaticModule {}
