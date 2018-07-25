import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { shareReplay, subscribeOn } from 'rxjs/operators';

export abstract class Store<T> {
  state$: Observable<T>;
  private _state$: BehaviorSubject<T>;

  get value(): T {
    return this._state$.getValue();
  }

  get name(): string {
    return this._name;
  }
  private _name: string;

  /**
   * 'Manager' sets namespace when registers state
   */
  get namespace(): string {
    return this._namespace;
  }
  private _namespace: string = '';

  constructor(name: string, initialState: T) {
    this._name = name;
    this._state$ = new BehaviorSubject(initialState);
    this.state$ = this._state$.pipe(shareReplay(1));
  }
}
