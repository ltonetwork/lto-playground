import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { ImportJSON, UpdateScenario } from '../actions';
import { ImportJsonComponent } from '../modals';

@Injectable()
export class ImportJSONEffect {
  constructor(_actions: Actions, private _dialog: MatDialog, private _store: Store) {
    _actions
      .pipe(ofActionDispatched(ImportJSON))
      .subscribe(action => this.showImportDialog(action));
  }

  showImportDialog(action: ImportJSON) {
    const dialog = this._dialog.open(ImportJsonComponent);

    return dialog.afterClosed().subscribe(data => {
      if (data) {
        this._store.dispatch(new UpdateScenario({ scenario: JSON.parse(data) }));
      }
    });
  }
}
