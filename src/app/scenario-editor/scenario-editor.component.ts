import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ScenarioEditorStore } from './scenario-editor.store';
import { Observable, Subscription, Subject } from 'rxjs';
import { Dispatcher } from '@waffle/core';
import { IMonacoSchema } from './interfaces';
import { UpdateScenario, LoadSchemas } from './actions';
import { DummyScenario } from './dummy-scenario';
import { JsonEditorComponent } from './components';
import { debounceTime } from '../../../node_modules/rxjs/operators';

@Component({
  selector: 'lto-scenario-editor',
  templateUrl: './scenario-editor.component.html',
  styleUrls: ['./scenario-editor.component.scss']
})
export class ScenarioEditorComponent implements OnDestroy {
  @ViewChild('editor') editor?: JsonEditorComponent;
  schemas$: Observable<IMonacoSchema[] | null>;

  scenario$: Observable<any>;
  private _scenarioChanges$: Subject<any> = new Subject();
  private _editorSubscription?: Subscription;

  constructor(_store: ScenarioEditorStore, private _dispatcher: Dispatcher) {
    this.schemas$ = _store.schema$;
    this.scenario$ = _store.scenario$;

    this._editorSubscription = this._scenarioChanges$
      .pipe(debounceTime(300))
      .subscribe(scenario => this.updateScenario(scenario));

    // Set dummy scenario
    _dispatcher.dispatch([new UpdateScenario({ scenario: DummyScenario }), new LoadSchemas()]);
  }

  ngOnDestroy() {
    if (this._editorSubscription) {
      this._editorSubscription.unsubscribe();
    }
  }

  scenarioChanged(scenario: any) {
    this._scenarioChanges$.next(scenario);
  }

  updateScenario(scenario: any) {
    this._dispatcher.dispatch(new UpdateScenario({ scenario }));
  }

  trackByFn(index: number, item: any) {
    return item.key;
  }
}
