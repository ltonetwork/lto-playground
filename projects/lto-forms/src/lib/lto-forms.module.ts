import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AmountModule,
  CheckboxModule,
  DatepickerModule,
  ExpressionModule,
  FormStepModule,
  GroupModule,
  MoneyModule,
  SelectModule,
  StaticModule,
  TextInputModule,
  TextareaModule
} from './components';
import { FieldNamePipe, GroupNamePipe } from './pipes';
import { LtoFormComponent } from './lto-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AmountModule,
    CheckboxModule,
    DatepickerModule,
    ExpressionModule,
    FormStepModule,
    GroupModule,
    MoneyModule,
    SelectModule,
    StaticModule,
    TextInputModule,
    TextareaModule
  ],
  declarations: [LtoFormComponent, FieldNamePipe, GroupNamePipe],
  exports: [LtoFormComponent]
})
export class LtoFormsModule {}
