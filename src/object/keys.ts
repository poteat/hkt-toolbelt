import { Kind, Type, Union } from '..';

export type _$keys<T extends Record<string, unknown>> = Union._$toList<keyof T>;

export interface Keys extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Record<string, unknown>>): _$keys<typeof x>;
}
