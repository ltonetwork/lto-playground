import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Effect } from '@waffle/core';
import { ShowFormData } from '../actions';
import { FormDataComponent } from '../modals';

@Injectable()
export class ShowFormDataEffect {
  constructor(private _dialog: MatDialog) {}

  @Effect(ShowFormData)
  showFormData(action: ShowFormData) {
    this._dialog.open(FormDataComponent, {
      data: action.payload.data,
      width: '450px'
    });
  }
}
