import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpressionComponent } from './expression.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ExpressionComponent],
  exports: [ExpressionComponent]
})
export class ExpressionModule {}
