import { Injectable, Inject } from '@angular/core';
import { Observable, of, forkJoin, Subject, BehaviorSubject } from 'rxjs';
import { Store } from './types/store';
import { getMatadata, ACTIONS_METADATA_KEY, EFFECTS_METADATA_KEY } from './metadata/decorators';
import { ACTIONS$, ACTION_COMPLETE$ } from './tokens';
import { ActionContext } from './types/action-context';
import { Action } from './types/action';
import { map, catchError, filter } from 'rxjs/operators';
import { StoreRegistered } from './internal/actions';

interface Reactions {
  [actionType: string]: {
    [namespace: string]: StoreInfo[];
    __ignore__: StoreInfo[];
  };
}

interface StoreInfo {
  instance: any;
  methodName: string;
}

@Injectable()
export class Manager {
  private _effectsReactions: Reactions = {};
  private _storesRegistry: {
    [namespace: string]: Store<any>[];
  } = {};

  // Map of namepspace + store + action to have quick access
  private _storeActionHandlers: {
    [namespace: string]: {
      [storeName: string]: Array<{
        handlerName: string;
        actionType: string;
        ignoreNamespace: boolean;
      }>;
    };
  } = {};

  private get _namespaces(): string[] {
    return Object.keys(this._storesRegistry);
  }
  private _centralState$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  private _devTools: any;

  constructor(
    @Inject(ACTIONS$) private _actions$: Subject<ActionContext>,
    @Inject(ACTION_COMPLETE$) private _actionComplete$: Subject<void>
  ) {
    // Enable devtools
    const withDevtools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
    if (withDevtools) {
      this._devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect();
      this._devTools.init();
    }

    _actions$.subscribe(actionContext => {
      // First run through our stores and calculate new state
      const newState = this._updateState(actionContext);
      this._centralState$.next(newState);
      const { action } = actionContext;
      const actionType = Object.getPrototypeOf(action).constructor.type;

      if (this._devTools) {
        this._devTools.send({ type: actionType, payload: action }, newState);
      }

      // Run all effects
      this._runEffects(actionType, action, actionContext.namespace);
    });
  }

  addStore(instance: Store<any>, namespace: string) {
    (instance as any)._namespace = namespace;
    // Check if this instance already registered
    if (
      this._storesRegistry[namespace] &&
      this._storesRegistry[namespace].indexOf(instance) !== -1
    ) {
      throw '[' + namespace + ']' + instance.name + ' already registered';
    }

    if (!this._storesRegistry[namespace]) {
      this._storesRegistry[namespace] = [];
      this._storeActionHandlers[namespace] = {};
    }

    this._storesRegistry[namespace].push(instance);
    // Make a map of actionTypes + methodNames to increase performance
    const handlers = this._buildActionHandlersMap(instance);
    this._storeActionHandlers[namespace][instance.name] = handlers;

    // After we add store - connect it to our central store
    this._centralState$
      .pipe(
        filter(state => !!state[namespace]),
        filter(state => !!state[namespace][instance.name]),
        map(state => {
          return state[namespace][instance.name];
        })
      )
      .subscribe((instance as any)._state$);
    this._actions$.next({
      namespace,
      action: new StoreRegistered(namespace, instance.name)
    });
  }

  addEffect(instance: any, namespace: string) {
    this._addReaction(instance, namespace, EFFECTS_METADATA_KEY, this._effectsReactions);
  }

  private _addReaction(
    instance: any,
    reactionNamespace: string,
    metadataKey: string,
    reactions: Reactions
  ) {
    const metadata = getMatadata(instance, metadataKey);
    metadata.forEach(meta => {
      const namespace = meta.ignoreNamespace ? '__ignore__' : reactionNamespace;

      meta.actions.forEach(actionClass => {
        const actionType = actionClass.type;
        if (!reactions[actionType]) {
          reactions[actionType] = {
            __ignore__: []
          };
        }

        if (!reactions[actionType][namespace]) {
          reactions[actionType][namespace] = [];
        }

        reactions[actionType][namespace].push({
          instance,
          methodName: meta.propertyName
        });
      });
    });
  }

  /**
   * Build action handlers to quick be able to quick find proper handlers (Performance)
   * when we build new state
   *
   * @param storeInstance store instance
   */
  private _buildActionHandlersMap(
    storeInstance: Store<any>
  ): Array<{
    handlerName: string;
    actionType: string;
    ignoreNamespace: boolean;
  }> {
    const metadata = getMatadata(storeInstance, ACTIONS_METADATA_KEY);
    return metadata.reduce(
      (handlersData, meta) => {
        const actionHandlers = meta.actions.map(actionConstructor => {
          const actionType = actionConstructor.type;

          return {
            actionType,
            handlerName: meta.propertyName,
            ignoreNamespace: meta.ignoreNamespace
          };
        });

        return [...handlersData, ...actionHandlers];
      },
      [] as any
    );
  }

  private _updateState(actionCtx: ActionContext) {
    const { action } = actionCtx;
    const actionType = Object.getPrototypeOf(action).constructor.type;
    const prevState: any = this._centralState$.getValue(); // Get previous state
    // Now we have to go through all registered stores and build new state
    return this._namespaces.reduce((state, storeNamespace) => {
      const namespaceState = this._storesRegistry[storeNamespace].reduce(
        (nsState, storeInstance) => {
          // Now we need to calculate new state for this particular store
          const notInitialized =
            !prevState[storeNamespace] || !prevState[storeNamespace][storeInstance.name];
          const storePrevState = notInitialized
            ? storeInstance.value
            : prevState[storeNamespace][storeInstance.name];
          // Let go through action handlers of this stateInstance and build new peace of state
          const storeNewState = this._storeActionHandlers[storeNamespace][
            storeInstance.name
          ].reduce((newState, handlerInfo) => {
            if (actionType === handlerInfo.actionType) {
              if (handlerInfo.ignoreNamespace || storeNamespace === actionCtx.namespace) {
                return (storeInstance as any)[handlerInfo.handlerName](storePrevState, action);
              }
            }

            return newState;
          }, storePrevState);

          return {
            ...nsState,
            [storeInstance.name]: storeNewState
          };
        },
        {}
      );
      return {
        ...state,
        [storeNamespace]: namespaceState
      };
    }, {});
  }

  private _runEffects(actionType: string, action: any, namespace: string) {
    const effects = this._effectsReactions[actionType];
    if (effects) {
      const results = effects.__ignore__.concat(effects[namespace] || []).map(effectInfo => {
        // Decorator should take care of method return value
        let result: Observable<Action> | Observable<Action[]> | undefined = void 0;
        try {
          result = effectInfo.instance[effectInfo.methodName](action);
        } catch (error) {
          console.error(error);
        }

        return result === void 0 ? of(null) : result;
      });

      // For a some reason TS resolve types wrong, so use any here
      forkJoin(results).subscribe((followUpActions: any) => {
        // Signal that all results of this action are resolved
        this._actionComplete$.next(action);
        // Dispatch followUpActions in same namespace
        followUpActions.forEach((fa: Action | Action[] | null) => {
          if (fa) {
            const actions = Array.isArray(fa) ? fa : [fa];
            // Dispatch all folowing actions in same namespace
            actions.forEach(_action => {
              this._actions$.next({
                namespace: namespace,
                action: _action
              });
            });
          }
        });
      });
    }
  }

  private _logDevTools() {}
}
