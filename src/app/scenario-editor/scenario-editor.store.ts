import { Injectable } from '@angular/core';
import { Store } from '@waffle/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMonacoSchema } from './interfaces';
import {
  JsonSchema,
  ScenarioSchema,
  ActionSchema,
  DataInstructionsSchema,
  DocumentSchema,
  EventChainSchema,
  CommentSchema,
  IdentitySchema,
  FormSchema
} from './schemas';

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
        },
        {
          uri: DocumentSchema.$id,
          fileMatch,
          schema: DocumentSchema
        },
        {
          uri: EventChainSchema.$id,
          fileMatch,
          schema: EventChainSchema
        },
        {
          uri: CommentSchema.$id,
          fileMatch,
          schema: CommentSchema
        },
        {
          uri: IdentitySchema.$id,
          fileMatch,
          schema: IdentitySchema
        },
        {
          uri: FormSchema.$id,
          fileMatch,
          schema: FormSchema
        }
      ]
    });

    this.schema$ = this.state$.pipe(map(state => state.schemas));
  }
}
