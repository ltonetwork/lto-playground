import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';
import { WaffleModule } from '@waffle/core';
import { LtoFormsModule } from '@lto/forms';
import {
  MatExpansionModule,
  MatDividerModule,
  MatIconModule,
  MatButtonModule,
  MatTabsModule,
  MatCardModule
} from '@angular/material';

import { JsonEditorModule } from './components';
import { FormDataModule } from './modals';

import { ScenarioEditorComponent } from './scenario-editor.component';
import { ScenarioEditorStore } from './scenario-editor.store';
import { LoadSchemaEffect, ShowFormDataEffect, DownloadJSONEffect } from './effects';

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
    FormDataModule,
    WaffleModule.forFeature(
      'scenario-editor',
      [ScenarioEditorStore],
      [LoadSchemaEffect, ShowFormDataEffect, DownloadJSONEffect]
    ),
    RouterModule.forChild([
      {
        path: '',
        component: ScenarioEditorComponent
      }
    ])
  ],
  declarations: [ScenarioEditorComponent]
})
export class ScenarioEditorModule {}
