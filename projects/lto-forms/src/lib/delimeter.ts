/**
 * In form metadata object which we receive from backend we often have "definitions" (groups)
 * with same name. It works pretty bad with validation and conditions, so we generate group names
 * like definition.group + DELIMETER + index. To avoid magic strings i decided to make this value
 * injectable.
 */
export const DELIMETER = '_____';
