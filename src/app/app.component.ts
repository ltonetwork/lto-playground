import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { AppState } from './app.state';
import { DownloadJSON, ImportJSON } from './scenario-editor/actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'lto-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Select(AppState.markers)
  markers$!: Observable<any>;

  constructor(private _store: Store) {}

  export() {
    this._store.dispatch(new DownloadJSON());
  }

  import() {
    this._store.dispatch(new ImportJSON());
  }
}
