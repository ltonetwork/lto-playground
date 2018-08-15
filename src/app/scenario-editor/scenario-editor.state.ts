import { HttpClient } from '@angular/common/http';
import { of, forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { State, StateContext, Action, Selector } from '@ngxs/store';
import { MatDialog } from '@angular/material';
import { UpdateScenario, SetSchemas, LoadSchemas, DownloadJSON } from './actions';
import { IMonacoSchema } from './interfaces';
import { JsonSchema, DataInstructionsSchema } from './schemas';

export interface IScenarioEditorState {
  schemas: IMonacoSchema[] | null;
  scenario: any;
}

@State<IScenarioEditorState>({
  name: 'scenarioEditorState',
  defaults: {
    scenario: null,
    schemas: null
  }
})
export class ScenarioEditorState {
  @Selector()
  static schemas(state: IScenarioEditorState) {
    return state.schemas;
  }

  @Selector()
  static scenario(state: IScenarioEditorState) {
    return state.scenario;
  }

  constructor(private _http: HttpClient, private _dialog: MatDialog) {}

  @Action(UpdateScenario)
  updateScenario(ctx: StateContext<IScenarioEditorState>, action: UpdateScenario) {
    ctx.patchState({ scenario: action.payload.scenario });
  }

  @Action(SetSchemas)
  setSchemas(ctx: StateContext<IScenarioEditorState>, action: SetSchemas) {
    const fileMatch = ['*.json'];
    const schemas = action.payload.schemas.map(schema => ({
      uri: schema['$id'],
      fileMatch,
      schema
    }));
    ctx.patchState({ schemas });
  }

  @Action(LoadSchemas)
  loadSchemas(ctx: StateContext<IScenarioEditorState>) {
    const calls = [
      of(JsonSchema), // We have it hardcoded becase json-schema.org have no AJAX api
      this._http.get('https://specs.livecontracts.io/scenario/schema.json'),
      this._http.get('https://specs.livecontracts.io/action/schema.json'),
      this._http.get('https://specs.livecontracts.io/comment/schema.json'),
      // this._http.get('https://specs.livecontracts.io/data-instruction/schema.json'),
      of(DataInstructionsSchema), // TODO: Fix online version of DataInstruction
      this._http.get('https://specs.livecontracts.io/document/schema.json'),
      this._http.get('https://specs.livecontracts.io/event-chain/schema.json'),
      this._http.get('https://specs.livecontracts.io/form/schema.json'),
      this._http.get('https://specs.livecontracts.io/identity/schema.json')
    ];

    return forkJoin(calls).pipe(tap(schemas => ctx.dispatch(new SetSchemas({ schemas }))));
  }

  @Action(DownloadJSON)
  downloadJSON(ctx: StateContext<IScenarioEditorState>) {
    const state = ctx.getState();
    const scenario = state.scenario;
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
  }
}
