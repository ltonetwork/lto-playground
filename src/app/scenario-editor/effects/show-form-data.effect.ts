import { Injectable } from '@angular/core';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { MatDialog } from '@angular/material';
import { FormDataComponent } from '../modals';
import { ShowFormData } from '../actions';

@Injectable()
export class ShowFormDataEffect {
  constructor(_actions: Actions, private _dialog: MatDialog) {
    _actions
      .pipe(ofActionDispatched(ShowFormData))
      .subscribe((action: ShowFormData) => this.showFormData(action));
  }

  showFormData(action: ShowFormData) {
    this._dialog.open(FormDataComponent, {
      data: action.payload.data,
      minWidth: '340px'
    });
  }
}
