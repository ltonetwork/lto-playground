import { Injectable } from '@angular/core';
import { Store, Action } from '@waffle/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UpdateScenario, SetSchemas } from './actions';
import { IMonacoSchema } from './interfaces';

interface IScenarioEditorState {
  schemas: IMonacoSchema[] | null;
  scenario: any;
}

@Injectable()
export class ScenarioEditorStore extends Store<IScenarioEditorState> {
  schema$: Observable<IMonacoSchema[] | null>;
  scenario$: Observable<any>;

  constructor() {
    super('ScenarioEditorStore', {
      scenario: null,
      schemas: null
    });

    this.schema$ = this.state$.pipe(map(state => state.schemas));
    this.scenario$ = this.state$.pipe(map(state => state.scenario));
  }

  @Action(UpdateScenario)
  updateScenario(state: IScenarioEditorState, action: UpdateScenario): IScenarioEditorState {
    return {
      ...state,
      scenario: action.payload.scenario
    };
  }

  @Action(SetSchemas)
  setSchemas(state: IScenarioEditorState, action: SetSchemas): IScenarioEditorState {
    const fileMatch = ['*.json'];
    const schemas = action.payload.schemas.map(schema => ({
      uri: schema['$id'],
      fileMatch,
      schema
    }));
    return {
      ...state,
      schemas
    };
  }
}
