import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { ScenarioEditorComponent } from './scenario-editor.component';

@NgModule({
  imports: [
    SharedModule,
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
