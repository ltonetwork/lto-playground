import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { WaffleModule } from '@waffle/core';
import { JsonEditorModule } from './components';

import { ScenarioEditorComponent } from './scenario-editor.component';
import { ScenarioEditorStore } from './scenario-editor.store';
import { LoadSchemaEffect } from './effects';

@NgModule({
  imports: [
    SharedModule,
    JsonEditorModule,
    WaffleModule.forFeature('scenario-editor', [ScenarioEditorStore], [LoadSchemaEffect]),
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
