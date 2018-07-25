import { TestBed, inject } from '@angular/core/testing';
import { Subject, of, ReplaySubject } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';
import { Dispatcher } from './dispatcher';
import { ACTIONS$, NAMESPACE, ACTION_COMPLETE$ } from './tokens';
import { ActionContext } from './types/action-context';
import { Action } from './types/action';

describe('Dispatcher', () => {
  let actions$: Subject<ActionContext>;
  let actionComplete$: Subject<Action>;

  beforeEach(() => {
    actions$ = new Subject();
    actionComplete$ = new Subject();

    TestBed.configureTestingModule({
      providers: [
        Dispatcher,
        {
          provide: ACTIONS$,
          useValue: actions$
        },
        {
          provide: NAMESPACE,
          useValue: 'TEST_NAMESPACE'
        },
        {
          provide: ACTION_COMPLETE$,
          useValue: actionComplete$
        }
      ]
    });
  });

  it('should create', inject([Dispatcher], (dispatcher: Dispatcher) => {
    expect(dispatcher).toBeTruthy();
  }));

  it('should dispatch an action', inject([Dispatcher], (dispatcher: Dispatcher) => {
    let action;
    actions$.subscribe(a => (action = a));
    dispatcher.dispatch({ type: 'FOO' });
    expect(action).toBeTruthy();
  }));

  it('should dispatch array of actions', inject([Dispatcher], (dispatcher: Dispatcher) => {
    let actions: any[] = [];
    actions$.subscribe(a => actions.push(a));

    dispatcher.dispatch([{ type: 'FOO' }, { type: 'BAR' }]);
    expect(actions.length).toBe(2);
  }));

  it('should use namespace', inject([Dispatcher], (dispatcher: Dispatcher) => {
    let action: any;
    actions$.subscribe(a => (action = a));
    dispatcher.dispatch({ type: 'FOO' });
    expect(action.namespace).toBe('TEST_NAMESPACE');
  }));
});
