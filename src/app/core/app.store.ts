import { Injectable } from '@angular/core';
import { Store } from '@waffle/core';

interface AppState {}

@Injectable()
export class AppStateStore extends Store<AppState> {
  constructor() {
    super('AppState', {});
  }
}
