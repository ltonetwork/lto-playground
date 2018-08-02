import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatTooltipModule
} from '@angular/material';
import { AmountComponent } from './amount.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule
  ],
  declarations: [AmountComponent],
  exports: [AmountComponent]
})
export class AmountModule {}
