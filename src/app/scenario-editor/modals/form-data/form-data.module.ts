import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormDataComponent } from './form-data.component';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule, FlexLayoutModule],
  declarations: [FormDataComponent],
  entryComponents: [FormDataComponent]
})
export class FormDataModule {}
