export const ACTIONS_METADATA_KEY = '__@waffle/actions__';
export const EFFECTS_METADATA_KEY = '__@waffle/effects__';

export interface ReactionMetadata {
  propertyName: string;
  actions: Array<{ type: string }>;
  ignoreNamespace: boolean;
}

export const Action = decoratorFactory(ACTIONS_METADATA_KEY);
export const Effect = decoratorFactory(EFFECTS_METADATA_KEY);

export function getMatadata(instance: any, metadataKey: string): ReactionMetadata[] {
  const prototype = Object.getPrototypeOf(instance);
  return (prototype.constructor as any)[metadataKey] || [];
}

function decoratorFactory(METADATA_KEY: string) {
  return function(
    action: { type: string } | Array<{ type: string }>,
    ignoreNamespace: boolean = false
  ) {
    return function(target: any, propertyName: string) {
      const actions = Array.isArray(action) ? action : [action];
      const metadata: ReactionMetadata = { propertyName, actions, ignoreNamespace };
      const constructor = target.constructor;
      const meta: any[] = constructor.hasOwnProperty(METADATA_KEY)
        ? (constructor as any)[METADATA_KEY]
        : Object.defineProperty(constructor, METADATA_KEY, { value: [] })[METADATA_KEY];
      Array.prototype.push.apply(meta, [metadata]);
    } as any;
  };
}
