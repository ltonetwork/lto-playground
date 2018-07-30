import { Injectable } from '@angular/core';
import { Store } from '@waffle/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMonacoSchema } from './interfaces';
import { JsonSchema, ScenarioSchema, ActionSchema, DataInstructionsSchema } from './schemas';

interface IScenarioEditorState {
  schemas: IMonacoSchema[] | null;
}

@Injectable()
export class ScenarioEditorStore extends Store<IScenarioEditorState> {
  schema$: Observable<IMonacoSchema[] | null>;

  constructor() {
    const fileMatch = ['*.json'];
    super('ScenarioEditorStore', {
      schemas: [
        {
          uri: JsonSchema.$id,
          fileMatch,
          schema: JsonSchema
        },
        {
          uri: ScenarioSchema.$id,
          fileMatch,
          schema: ScenarioSchema
        },
        {
          uri: ActionSchema.$id,
          fileMatch,
          schema: ActionSchema
        },
        {
          uri: DataInstructionsSchema.$id,
          fileMatch,
          schema: DataInstructionsSchema
        }
      ]
    });

    this.schema$ = this.state$.pipe(map(state => state.schemas));
  }
}
