import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatRadioModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupComponent } from './group.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatRadioModule,
    ReactiveFormsModule
  ],
  declarations: [GroupComponent],
  exports: [GroupComponent]
})
export class GroupModule {}
