export class LoadSchema {
  static readonly type = 'LOAD_SCHEMA';
}

export class SetSchema {
  static readonly type = 'SET_SCHEMA';
  constructor(public payload: { schema: object }) {}
}

export class UpdateScenario {
  static readonly type = 'UPDATE_SCENARIO';
  constructor(public payload: { scenario: any }) {}
}
