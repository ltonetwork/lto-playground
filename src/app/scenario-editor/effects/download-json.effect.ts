import { Injectable } from '@angular/core';
import { Effect } from '@waffle/core';
import { DownloadJSON } from '../actions';
import { ScenarioEditorStore } from '../scenario-editor.store';
import { take } from '../../../../node_modules/rxjs/operators';

@Injectable()
export class DownloadJSONEffect {
  constructor(private _editorState: ScenarioEditorStore) {}

  @Effect(DownloadJSON, true)
  downloadJSON() {
    this._editorState.scenario$.pipe(take(1)).subscribe(scenario => {
      const file = new Blob([JSON.stringify(scenario, null, 2)]);
      const a = document.createElement('a');
      const url = URL.createObjectURL(file);
      a.href = url;
      a.download = 'scenario.json';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    });
  }
}
