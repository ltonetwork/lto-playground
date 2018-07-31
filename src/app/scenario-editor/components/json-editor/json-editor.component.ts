import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  Input,
  NgZone,
  SimpleChanges,
  forwardRef,
  Output,
  EventEmitter
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { MonacoEditorTheme } from './editor-theme';
import { IMonacoSchema } from '../../interfaces';

declare var monaco: any;

@Component({
  selector: 'lto-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.scss']
})
export class JsonEditorComponent implements OnInit, OnDestroy {
  @Input() schemas!: IMonacoSchema[];
  @Input() value: any;
  @Output() changeScenario = new EventEmitter();

  public static monacoLoadPromise: Promise<any> | null = null;

  @ViewChild('editorContainer') private _editorContainer!: ElementRef;
  private _editor: monaco.editor.IStandaloneCodeEditor | null = null; // monaco editor instance
  private _windowResizeSubscription: Subscription | null = null;

  private _value: string = ''; // JSON string of editr value
  private _currentValueObj: any;

  constructor(private _zone: NgZone) {}

  ngOnInit() {
    this._loadMonaco();
  }

  ngOnDestroy() {
    if (this._editor) {
      this._editor.dispose();
    }

    if (this._windowResizeSubscription) {
      this._windowResizeSubscription.unsubscribe();
    }
  }

  ngOnChanges(change: SimpleChanges) {
    if (change.value && change.value.currentValue) {
      if (this._currentValueObj !== change.value.currentValue) {
        this._value = JSON.stringify(change.value.currentValue, null, 2);

        if (this._editor) {
          this._editor.setValue(this._value);
        }
      }
    }
  }

  /**
   * Load and initialize monaco-editor library
   */
  private async _loadMonaco() {
    if (JsonEditorComponent.monacoLoadPromise) {
      await JsonEditorComponent.monacoLoadPromise;
      this._initMonaco();

      return;
    }

    JsonEditorComponent.monacoLoadPromise = new Promise(resolve => {
      if ((window as any).monaco) {
        // Already loaded
        return resolve();
      }

      const onGotAmdLoader = () => {
        // Load monaco
        (<any>window).require.config({ paths: { vs: `/libs/monaco/vs` } });
        (<any>window).require(['vs/editor/editor.main'], () => {
          this._initMonaco();
          resolve();
        });
      };

      if (!(window as any).require) {
        const loaderScript: HTMLScriptElement = document.createElement('script');
        loaderScript.type = 'text/javascript';
        loaderScript.src = 'libs/monaco/vs/loader.js';
        loaderScript.addEventListener('load', onGotAmdLoader);
        document.body.appendChild(loaderScript);
      }
    });
  }

  private _initMonaco() {
    const monaco = (window as any).monaco;
    const fileId = 'foo.json';
    var model = monaco.editor.createModel(this._value, 'json', fileId);
    monaco.editor.defineTheme('ltoTheme', MonacoEditorTheme);
    monaco.editor.setTheme('ltoTheme');
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: this.schemas
    });
    if (!monaco) {
      throw 'window.monaco is not defined! Make sure that you load monaco-editro first!';
    }

    const options: monaco.editor.IEditorConstructionOptions = {
      language: 'json',
      fontSize: 14,
      model
    };
    this._editor = monaco.editor.create(
      this._editorContainer.nativeElement,
      options
    ) as monaco.editor.IStandaloneCodeEditor;

    this._editor.onDidChangeModelContent(e => {
      if (!this._editor) {
        // TS Will complain because _editor could be null
        return;
      }
      const value = this._editor.getValue();
      try {
        this._currentValueObj = JSON.parse(value);
        this.changeScenario.next(this._currentValueObj);
      } catch (err) {
        // Unable to parse JSON
        // But it happens 9 times out of 10 in process of editing
        // so we just swallow error here
      }
    });

    // refresh layout on resize event.
    if (this._windowResizeSubscription) {
      this._windowResizeSubscription.unsubscribe();
    }
    this._windowResizeSubscription = fromEvent(window, 'resize').subscribe(() =>
      this._layoutEditor()
    );
  }

  private _layoutEditor() {
    if (this._editor) {
      this._editor.layout();
    }
  }
}
