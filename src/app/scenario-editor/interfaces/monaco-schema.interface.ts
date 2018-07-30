export interface IMonacoSchema {
  /**
   * The URI of the schema, which is also the identifier of the schema.
   */
  readonly uri: string;
  /**
   * A list of file names that are associated to the schema. The '*' wildcard can be used. For example '*.schema.json', 'package.json'
   */
  readonly fileMatch?: string[];
  /**
   * The schema for the given URI.
   */
  readonly schema?: any;
}
