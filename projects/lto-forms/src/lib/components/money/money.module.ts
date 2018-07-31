import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatTooltipModule
} from '@angular/material';
import { MoneyComponent } from './money.component';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  declarations: [MoneyComponent],
  exports: [MoneyComponent]
})
export class MoneyModule {}
