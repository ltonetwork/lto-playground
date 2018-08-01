import { Injectable } from '@angular/core';
import { Store, Action } from '@waffle/core';
import { map } from 'rxjs/operators';
import { UpdateEditorMarkers } from './actions';

interface IAppState {
  editorMarkers: any[];
}

@Injectable()
export class AppStateStore extends Store<IAppState> {
  markers$ = this.state$.pipe(map(state => state.editorMarkers));

  constructor() {
    super('AppState', {
      editorMarkers: []
    });
  }

  @Action(UpdateEditorMarkers, true)
  updateMarkers(state: IAppState, action: UpdateEditorMarkers): IAppState {
    return {
      ...state,
      editorMarkers: action.payload.markers
    };
  }
}
