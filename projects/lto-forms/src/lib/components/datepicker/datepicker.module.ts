import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule
} from '@angular/material';
import { DatepickerComponent } from './datepicker.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule
  ],
  declarations: [DatepickerComponent],
  exports: [DatepickerComponent]
})
export class DatepickerModule {}
