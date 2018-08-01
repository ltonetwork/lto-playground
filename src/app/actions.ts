export class UpdateEditorMarkers {
  static readonly type = 'UpdateEditorMarkers';
  constructor(public payload: { markers: any[] }) {}
}
