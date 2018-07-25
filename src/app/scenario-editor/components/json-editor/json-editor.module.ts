import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonEditorComponent } from './json-editor.component';

@NgModule({
  imports: [CommonModule],
  declarations: [JsonEditorComponent],
  exports: [JsonEditorComponent]
})
export class JsonEditorModule {}
