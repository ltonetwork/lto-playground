import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, animate, style, transition } from '@angular/animations';
import { Store } from '@ngxs/store';
import { ShowFormData } from '../../scenario-editor/actions';
import { ScenarioEditorState } from '../../scenario-editor/scenario-editor.state';
import { take } from 'rxjs/operators';

@Component({
  selector: 'lto-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss'],
  animations: [
    trigger('showAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('0.15s cubic-bezier(0.0, 0.0, 0.2, 1)', style({ transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)' }),
        animate('0.15s cubic-bezier(0.0, 0.0, 0.2, 1)', style({ transform: 'scale(0)' }))
      ])
    ])
  ]
})
export class AppbarComponent implements OnInit {
  @Input()
  markers!: any[];
  @Output()
  export = new EventEmitter();
  @Output()
  import = new EventEmitter();

  constructor(private _store: Store) {}

  ngOnInit() {}

  exportClick() {
    this.export.next();
  }

  importClick() {
    this.import.next();
  }

  async showScenario() {
    const scenario = await this._store.selectOnce(ScenarioEditorState.scenario).toPromise();
    this._store.dispatch(new ShowFormData({ data: scenario }));
  }
}
