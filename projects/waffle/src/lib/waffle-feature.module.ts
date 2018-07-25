import { NgModule, Inject, Self } from '@angular/core';
import { NAMESPACE, STORES, EFFECTS } from './tokens';
import { Manager } from './manager';
import { Store } from './types/store';

@NgModule({})
export class WaffleFeatureModule {
  constructor(
    @Self()
    @Inject(NAMESPACE)
    namespace: string,
    @Self()
    @Inject(STORES)
    stores: Store<any>[],
    @Self()
    @Inject(EFFECTS)
    effects: any[],
    manager: Manager
  ) {
    stores.forEach(store => manager.addStore(store, namespace));
    effects.forEach(effect => manager.addEffect(effect, namespace));
  }
}
