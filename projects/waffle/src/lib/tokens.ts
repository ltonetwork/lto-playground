import { InjectionToken } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { ActionContext } from './types/action-context';
import { Action } from './types/action';

export const NAMESPACE = new InjectionToken<string>('NAMESPACE');
export const ACTIONS$ = new InjectionToken<Subject<ActionContext>>('ACTIONS$');
export const STORES = new InjectionToken<any>('STORES');
export const ACTION_COMPLETE$ = new InjectionToken<Subject<Action>>('ACTION_COMPLETE$');
export const EFFECTS = new InjectionToken<any>('EFFECTS');
