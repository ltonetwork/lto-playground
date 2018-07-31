import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatSelectModule,
  MatIconModule,
  MatTooltipModule
} from '@angular/material';
import { SelectComponent } from './select.component';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  declarations: [SelectComponent],
  exports: [SelectComponent]
})
export class SelectModule {}
