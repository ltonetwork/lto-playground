import { Injectable } from '@angular/core';
import { Effect } from '@waffle/core';
import { LoadSchema, SetSchema } from '../actions';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable()
export class LoadSchemaEffect {
  private _loadedSchemas: { [url: string]: Promise<any> } = {}; // Cache for promises
  constructor(private _http: HttpClient) {}

  @Effect(LoadSchema)
  async loadSchema(action: LoadSchema): Promise<any> {
    console.log('Load schema');
    // Load primary schema
    const stuff = await this._loadRecusive('https://specs.livecontracts.io/scenario/schema.json');

    this._http.get<any>('https://specs.livecontracts.io/scenario/schema.json');
    return this._http
      .get<any>('https://specs.livecontracts.io/scenario/schema.json')
      .pipe(map(schema => new SetSchema({ schema })));
  }

  private async _loadRecusive(schemaUrl: string): Promise<any> {
    if (this._loadedSchemas[schemaUrl]) {
      return this._loadedSchemas[schemaUrl];
    }

    this._loadedSchemas[schemaUrl] = this._http
      .get<any>(schemaUrl)
      .pipe(take(1))
      .toPromise();

    const schema = await this._loadedSchemas[schemaUrl];
    console.log(schemaUrl + ' loaded');
    // Now we need to recursively go throug this schema and load $ref schemas
    const refs = Object.keys(this._getRefsUrlsMap(schema));
    console.log('Refs: ', refs);
    // Load each of them
    const refsPromises = refs.map(refUrl => this._loadRecusive(refUrl));

    return Promise.all(refsPromises);
  }

  private _getRefsUrlsMap(schema: any): string[] {
    const urls = Object.keys(schema).reduce((refs, key) => {
      const value = schema[key];
      if (key === '$ref' && value.startsWith('http')) {
        // URLS comes with '#' sumbol to match with different sections
        // but in fact it is same url
        const realPart = value.split('#')[0];
        return { ...refs, [realPart]: true };
      }

      if (Array.isArray(value)) {
        const childUrls = value.reduce((urls, child) => {
          const cu = this._getRefsUrlsMap(child);
          return { ...urls, ...cu };
        }, {});

        return {
          ...refs,
          ...childUrls
        };
      }

      if (typeof value === 'object') {
        const childUrls = this._getRefsUrlsMap(value);
        return { ...refs, ...childUrls };
      }

      return refs;
    }, {});
    return urls;
  }
}
