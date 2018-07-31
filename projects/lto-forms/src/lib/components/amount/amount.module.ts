import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AmountComponent } from './amount.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [AmountComponent],
  exports: [AmountComponent]
})
export class AmountModule {}
