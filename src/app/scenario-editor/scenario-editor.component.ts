import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ScenarioEditorStore } from './scenario-editor.store';
import { Observable, Subscription } from 'rxjs';
import { Dispatcher } from '@waffle/core';
import { IMonacoSchema } from './interfaces';
import { UpdateScenario } from './actions';
import { DummyScenario } from './dummy-scenario';
import { JsonEditorComponent } from './components';
import { debounceTime } from '../../../node_modules/rxjs/operators';

@Component({
  selector: 'lto-scenario-editor',
  templateUrl: './scenario-editor.component.html',
  styleUrls: ['./scenario-editor.component.scss']
})
export class ScenarioEditorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('editor') editor!: JsonEditorComponent;
  schemas$: Observable<IMonacoSchema[] | null>;

  scenario$: Observable<any>;
  private _editorSubscription?: Subscription;

  constructor(_store: ScenarioEditorStore, private _dispatcher: Dispatcher) {
    this.schemas$ = _store.schema$;
    this.scenario$ = _store.scenario$;

    // Set dummy scenario
    _dispatcher.dispatch(new UpdateScenario({ scenario: DummyScenario }));
  }

  ngOnDestroy() {
    if (this._editorSubscription) {
      this._editorSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.editor.changeScenario
      .pipe(debounceTime(300))
      .subscribe(scenario => this.updateScenario(scenario));
  }

  updateScenario(value: any) {
    this._dispatcher.dispatch(new UpdateScenario({ scenario: value }));
  }
}
