export class LoadSchema {
  static readonly type = 'LOAD_SCHEMA';
}

export class SetSchema {
  static readonly type = 'SET_SCHEMA';
  constructor(public payload: { schema: object }) {}
}
