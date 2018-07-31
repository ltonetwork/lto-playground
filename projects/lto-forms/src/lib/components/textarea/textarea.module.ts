import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatIconModule,
  MatTooltipModule,
  MatInputModule
} from '@angular/material';
import { TextareaComponent } from './textarea.component';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  declarations: [TextareaComponent],
  exports: [TextareaComponent]
})
export class TextareaModule {}
