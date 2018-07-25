import { TestBed, inject } from '@angular/core/testing';
import { Manager } from './manager';
import { Subject } from 'rxjs';
import { ACTION_COMPLETE$, ACTIONS$ } from './tokens';
import { ActionContext, Action as IAction, Store } from './types';
import { Action, Effect } from './metadata';

class Login implements IAction {
  static readonly type = 'LOGIN';
  constructor(public email: string, public password: string) {}
}

class Authenticated implements IAction {
  static readonly type = 'AUTHENTICATED';
  constructor(public session: string) {}
}

class FooAction implements IAction {
  static readonly type = 'FOO_ACTION';
}

class TestStore extends Store<{ authenticated: boolean }> {
  constructor() {
    super('TestStore', {
      authenticated: false
    });
  }

  @Action(Authenticated)
  authenticated(state: any, action: Authenticated) {
    return {
      authenticated: true
    };
  }

  @Action([Authenticated, FooAction])
  multipleHandler(state: any, action: any) {
    return state;
  }
}

describe('Manager', () => {
  let actionsMock$: Subject<ActionContext>;
  let actionCompleteMock$: Subject<IAction>;

  let testStore: TestStore;

  beforeEach(() => {
    testStore = new TestStore();
    actionCompleteMock$ = new Subject();
    actionsMock$ = new Subject();

    spyOn(testStore, 'authenticated').and.callThrough();
    spyOn(testStore, 'multipleHandler').and.callThrough();

    TestBed.configureTestingModule({
      providers: [
        Manager,
        {
          provide: ACTIONS$,
          useValue: actionsMock$
        },
        {
          provide: ACTION_COMPLETE$,
          useValue: actionCompleteMock$
        }
      ]
    });
  });

  it('should create', inject([Manager], (manager: Manager) => {
    expect(manager).toBeTruthy();
  }));

  describe('store', () => {
    it('should register store', inject([Manager], (manager: Manager) => {
      expect(() => manager.addStore(testStore, 'test_namespace')).not.toThrow();
    }));

    it('should not register same store twice in same namespace', inject(
      [Manager],
      (manager: Manager) => {
        const store = new TestStore();
        manager.addStore(testStore, 'test_namespace');
        expect(() => manager.addStore(testStore, 'test_namespace')).toThrow();
      }
    ));

    it('should call handler on action', inject([Manager], (manager: Manager) => {
      manager.addStore(testStore, 'test_namespace');
      actionsMock$.next({ namespace: 'test_namespace', action: new Authenticated('fake_session') });
      expect(testStore.authenticated).toHaveBeenCalled();
    }));

    it('should not call handlers for other actions', inject([Manager], (manager: Manager) => {
      manager.addStore(testStore, 'test_namespace');
      actionsMock$.next({ namespace: 'test_namespace', action: new Login('test@test', 'test') });
      expect(testStore.authenticated).not.toHaveBeenCalled();
    }));

    it('should pass prevState and action as parameters', inject([Manager], (manager: Manager) => {
      const action = new Authenticated('fake_session');
      manager.addStore(testStore, 'test_namespace');
      actionsMock$.next({ namespace: 'test_namespace', action });
      expect(testStore.authenticated).toHaveBeenCalledWith({ authenticated: false }, action);
    }));

    it('should pass action for handlers with multiple actions', inject(
      [Manager],
      (manager: Manager) => {
        manager.addStore(testStore, 'test_namespace');
        actionsMock$.next({
          namespace: 'test_namespace',
          action: new Authenticated('fake_session')
        });
        actionsMock$.next({ namespace: 'test_namespace', action: new FooAction() });

        expect(testStore.multipleHandler).toHaveBeenCalledTimes(2);
      }
    ));

    it('should update store state', inject([Manager], (manager: Manager) => {
      manager.addStore(testStore, 'test_namespace');
      actionsMock$.next({ namespace: 'test_namespace', action: new Authenticated('fake_session') });

      expect(testStore.value).toEqual({ authenticated: true });
    }));
  });
});
