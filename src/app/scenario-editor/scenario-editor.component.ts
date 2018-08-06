import { Component, OnDestroy } from '@angular/core';
import { ScenarioEditorStore } from './scenario-editor.store';
import { Observable, Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Dispatcher } from '@waffle/core';
import { IMonacoSchema } from './interfaces';
import { UpdateScenario, LoadSchemas, ShowFormData } from './actions';
import { UpdateEditorMarkers } from '@app/actions';
// import { DummyScenario } from './dummy-scenario';
import { Dummy2 } from './dummy-scenarios';
import { trigger, query, stagger, animate, style, transition } from '@angular/animations';

@Component({
  selector: 'lto-scenario-editor',
  templateUrl: './scenario-editor.component.html',
  styleUrls: ['./scenario-editor.component.scss'],
  animations: [
    trigger('sectionAnimation', [
      transition('void => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(50px)' }),
          stagger(
            100,
            animate(
              '0.25s cubic-bezier(0.0, 0.0, 0.2, 1)',
              style({ opacity: 1, transform: 'translateY(0px)' })
            )
          )
        ])
      ])
    ])
  ]
})
export class ScenarioEditorComponent implements OnDestroy {
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
    _dispatcher.dispatch([new UpdateScenario({ scenario: Dummy2 }), new LoadSchemas()]);
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

  showFormData(data: any) {
    this._dispatcher.dispatch(new ShowFormData({ data }));
  }

  updateEditrMarkers(markers: any[]) {
    this._dispatcher.dispatch(new UpdateEditorMarkers({ markers }));
  }
}
