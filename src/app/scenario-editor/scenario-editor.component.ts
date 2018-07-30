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

  constructor(_store: ScenarioEditorStore) {
    this.schemas$ = _store.schema$;
  }

  ngOnInit() {}
}
