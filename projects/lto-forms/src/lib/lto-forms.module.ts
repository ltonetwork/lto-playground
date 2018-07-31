import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { LtoFormComponent } from './lto-form.component';

@NgModule({
  imports: [
    CommonModule,
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
  declarations: [LtoFormComponent],
  exports: [LtoFormComponent]
})
export class LtoFormsModule {}
