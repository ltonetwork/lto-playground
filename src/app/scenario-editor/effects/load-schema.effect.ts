import { Injectable } from '@angular/core';
import { Effect } from '@waffle/core';
import { LoadSchemas, SetSchemas } from '../actions';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { JsonSchema, DataInstructionsSchema } from '../schemas';

@Injectable()
export class LoadSchemaEffect {
  constructor(private _http: HttpClient) {}

  @Effect(LoadSchemas)
  loadSchema(action: LoadSchemas): Observable<SetSchemas> {
    const calls = [
      of(JsonSchema), // We have it hardcoded becase json-schema.org have no AJAX api
      this._http.get('https://specs.livecontracts.io/scenario/schema.json'),
      this._http.get('https://specs.livecontracts.io/action/schema.json'),
      this._http.get('https://specs.livecontracts.io/comment/schema.json'),
      // this._http.get('https://specs.livecontracts.io/data-instruction/schema.json'),
      of(DataInstructionsSchema),
      this._http.get('https://specs.livecontracts.io/document/schema.json'),
      this._http.get('https://specs.livecontracts.io/event-chain/schema.json'),
      this._http.get('https://specs.livecontracts.io/form/schema.json'),
      this._http.get('https://specs.livecontracts.io/identity/schema.json')
    ];
    return forkJoin(calls).pipe(map(schemas => new SetSchemas({ schemas })));
  }
}
