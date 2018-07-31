export class LoadSchemas {
  static readonly type = 'LOAD_SCHEMA';
}

export class SetSchemas {
  static readonly type = 'SET_SCHEMA';
  constructor(public payload: { schemas: any[] }) {}
}

export class UpdateScenario {
  static readonly type = 'UPDATE_SCENARIO';
  constructor(public payload: { scenario: any }) {}
}
