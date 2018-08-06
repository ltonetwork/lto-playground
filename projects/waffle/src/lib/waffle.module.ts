import { NgModule, ModuleWithProviders } from '@angular/core';
import { Subject } from 'rxjs';
import { NAMESPACE, ACTIONS$, STORES, ACTION_COMPLETE$, EFFECTS } from './tokens';
import { Store } from './types/store';
import { Manager } from './manager';
import { Dispatcher } from './dispatcher';

import { WaffleFeatureModule } from './waffle-feature.module';

export function instancesProvider(...instances: any[]) {
  return instances;
}

export function SubjectFactory() {
  return new Subject();
}

@NgModule({
  providers: [
    Manager,
    Dispatcher,
    {
      provide: NAMESPACE,
      useValue: 'global'
    },
    {
      provide: ACTIONS$,
      useValue: new Subject()
    },
    {
      provide: ACTION_COMPLETE$,
      useValue: new Subject()
    }
  ]
})
class WaffleRootModule {}

@NgModule({
  imports: [],
  declarations: [],
  exports: []
})
export class WaffleModule {
  static forRoot(stores: any[] = [], effects: any[] = []): ModuleWithProviders {
    return {
      ngModule: WaffleFeatureModule,
      providers: [
        Manager,
        Dispatcher,
        {
          provide: NAMESPACE,
          useValue: 'global'
        },
        {
          provide: ACTIONS$,
          useFactory: SubjectFactory
        },
        {
          provide: ACTION_COMPLETE$,
          useFactory: SubjectFactory
        },
        {
          provide: STORES,
          useFactory: instancesProvider,
          deps: stores
        },
        {
          provide: EFFECTS,
          useFactory: instancesProvider,
          deps: effects
        },
        ...effects,
        ...stores
      ]
    };
  }

  static forFeature(
    namespace: string,
    stores: any[] = [],
    effects: any[] = []
  ): ModuleWithProviders {
    return {
      ngModule: WaffleFeatureModule,
      providers: [
        Dispatcher,
        {
          provide: NAMESPACE,
          useValue: namespace
        },
        {
          provide: STORES,
          useFactory: instancesProvider,
          deps: stores
        },
        {
          provide: EFFECTS,
          useFactory: instancesProvider,
          deps: effects
        },
        ...effects,
        ...stores
      ]
    };
  }
}
