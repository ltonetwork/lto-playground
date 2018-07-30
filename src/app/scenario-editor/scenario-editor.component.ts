import { Component, OnInit } from '@angular/core';
import { ScenarioEditorStore } from './scenario-editor.store';
import { Observable } from 'rxjs';
import { IMonacoSchema } from './interfaces';

@Component({
  selector: 'lto-scenario-editor',
  templateUrl: './scenario-editor.component.html',
  styleUrls: ['./scenario-editor.component.scss']
})
export class ScenarioEditorComponent implements OnInit {
  schemas$: Observable<IMonacoSchema[] | null>;

  scenario: any = {
    $schema: 'https://specs.livecontracts.io/v0.1.0/scenario/schema.json#'
  };

  constructor(_store: ScenarioEditorStore) {
    this.schemas$ = _store.schema$;
  }

  ngOnInit() {}

  updateScenario(value: any) {
    console.log('New value: ', value);
    this.scenario = value;
  }
}
