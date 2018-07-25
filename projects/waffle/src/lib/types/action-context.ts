import { Action } from './action';

export interface ActionContext {
  namespace: string;
  action: Action;
}
