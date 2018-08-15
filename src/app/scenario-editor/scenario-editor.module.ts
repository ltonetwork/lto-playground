import { NgModule, APP_INITIALIZER } from '@angular/core';
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
import { ShowFormDataEffect, ImportJSONEffect } from './effects';

import { JsonEditorModule, VisDiagramViewerModule, D3DiagramViwerModule } from './components';
import { FormDataModule, ImportJsonModule } from './modals';

import { ScenarioEditorComponent } from './scenario-editor.component';

export function noop() {
  return function() {};
}

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
  declarations: [ScenarioEditorComponent],
  providers: [
    ShowFormDataEffect,
    ImportJSONEffect,
    {
      provide: APP_INITIALIZER,
      useFactory: noop,
      deps: [ShowFormDataEffect, ImportJSONEffect],
      multi: true
    }
  ]
})
export class ScenarioEditorModule {}
