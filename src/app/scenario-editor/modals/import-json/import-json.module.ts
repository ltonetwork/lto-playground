import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ImportJsonComponent } from './import-json.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FlexLayoutModule
  ],
  declarations: [ImportJsonComponent],
  entryComponents: [ImportJsonComponent]
})
export class ImportJsonModule {}
