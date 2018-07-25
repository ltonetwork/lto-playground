import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class StateStream extends BehaviorSubject<any> {
  constructor() {
    super({});
  }
}
