import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScenarioEditorComponent } from './scenario-editor/scenario-editor.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ScenarioEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
