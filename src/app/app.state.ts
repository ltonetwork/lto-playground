import { State, Action, StateContext, Selector } from '@ngxs/store';
import { UpdateEditorMarkers } from './actions';

export interface IAppState {
  editorMarkers: any[];
}

@State({
  name: 'appState',
  defaults: {}
})
export class AppState {
  @Selector()
  static markers(state: IAppState) {
    return state.editorMarkers;
  }

  @Action(UpdateEditorMarkers)
  updateMarkers(ctx: StateContext<IAppState>, action: UpdateEditorMarkers) {
    ctx.patchState({ editorMarkers: action.payload.markers });
  }
}
