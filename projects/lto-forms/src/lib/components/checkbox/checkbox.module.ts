import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatTooltipModule, MatIconModule } from '@angular/material';
import { CheckboxComponent } from './checkbox.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule, MatTooltipModule, MatIconModule],
  declarations: [CheckboxComponent],
  exports: [CheckboxComponent]
})
export class CheckboxModule {}
