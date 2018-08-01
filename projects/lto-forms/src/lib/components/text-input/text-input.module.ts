import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatTooltipModule
} from '@angular/material';
import { TextInputComponent } from './text-input.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule
  ],
  declarations: [TextInputComponent],
  exports: [TextInputComponent]
})
export class TextInputModule {}
