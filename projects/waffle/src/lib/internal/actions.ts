export class StoreRegistered {
  static readonly type = '@@StoreRegistered';
  constructor(public namespace: string, public storeName: string) {}
}
