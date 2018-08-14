import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';
import { LtoFormsModule } from '@lto/forms';
import { NgxsModule } from '@ngxs/store';
import { ScenarioEditorState } from './scenario-editor.state';
import {
  MatExpansionModule,
  MatDividerModule,
  MatIconModule,
  MatButtonModule,
  MatTabsModule,
  MatCardModule
} from '@angular/material';

import { JsonEditorModule, VisDiagramViewerModule, D3DiagramViwerModule } from './components';
import { FormDataModule, ImportJsonModule } from './modals';

import { ScenarioEditorComponent } from './scenario-editor.component';

@NgModule({
  imports: [
    SharedModule,
    NgxsModule.forFeature([ScenarioEditorState]),
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
    FormDataModule,
    ImportJsonModule
  ],
  declarations: [ScenarioEditorComponent]
})
export class ScenarioEditorModule {}
