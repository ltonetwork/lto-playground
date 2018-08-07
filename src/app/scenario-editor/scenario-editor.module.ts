import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';
import { LtoFormsModule } from '@lto/forms';
import {
  MatExpansionModule,
  MatDividerModule,
  MatIconModule,
  MatButtonModule,
  MatTabsModule,
  MatCardModule
} from '@angular/material';

import { JsonEditorModule, VisDiagramViewerModule, D3DiagramViwerModule } from './components';
import { FormDataModule } from './modals';

import { ScenarioEditorComponent } from './scenario-editor.component';

@NgModule({
  imports: [
    SharedModule,
    LtoFormsModule,
    MatExpansionModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    FormsModule,
    JsonEditorModule,
    VisDiagramViewerModule,
    D3DiagramViwerModule,
    FormDataModule
  ],
  declarations: [ScenarioEditorComponent]
})
export class ScenarioEditorModule {}
