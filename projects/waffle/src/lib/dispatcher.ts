import { Injectable, Inject } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, take, map } from 'rxjs/operators';
import { Action } from './types/action';
import { ActionContext } from './types/action-context';
import { ACTIONS$, NAMESPACE, ACTION_COMPLETE$ } from './tokens';

@Injectable()
export class Dispatcher {
  constructor(
    @Inject(ACTIONS$) private _actions$: Subject<ActionContext>,
    @Inject(NAMESPACE) private _namespace: string,
    @Inject(ACTION_COMPLETE$) private _actionComplete$: Observable<Action>
  ) {}

  dispatch(action: Action | Action[]): Promise<void> {
    const actions = Array.isArray(action) ? action : [action];
    actions.forEach(action => {
      this._actions$.next({
        namespace: this._namespace,
        action
      });
    });

    return this._actionComplete$
      .pipe(
        filter(completedAction => completedAction === action),
        map(() => void 0),
        take(1)
      )
      .toPromise();
  }
}
