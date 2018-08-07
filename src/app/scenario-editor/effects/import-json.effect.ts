import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Effect } from '@waffle/core';
import { ImportJSON, UpdateScenario } from '../actions';
import { ImportJsonComponent } from '../modals';
import { map } from 'rxjs/operators';

@Injectable()
export class ImportJSONEffect {
  constructor(private _dialog: MatDialog) {}

  @Effect(ImportJSON)
  showFormData(action: ImportJSON) {
    const dialog = this._dialog.open(ImportJsonComponent);

    return dialog.afterClosed().pipe(
      map(data => {
        if (data) {
          return new UpdateScenario({ scenario: JSON.parse(data) });
        }

        return null;
      })
    );
  }
}
