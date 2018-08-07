import { Component } from '@angular/core';
import { AppStateStore } from './app.store';
import { Dispatcher } from '@waffle/core';
import { DownloadJSON, ImportJSON } from './scenario-editor/actions';

@Component({
  selector: 'lto-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  markers$ = this._appStore.markers$;

  constructor(private _appStore: AppStateStore, private _dispatcher: Dispatcher) {}

  export() {
    this._dispatcher.dispatch(new DownloadJSON());
  }

  import() {
    this._dispatcher.dispatch(new ImportJSON());
  }
}
