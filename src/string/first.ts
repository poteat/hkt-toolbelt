import { Type, Kind } from '..';

export type _$first<S extends string> = S extends `${infer Head}${string}`
  ? Head
  : string extends S
  ? S
  : '';

export interface First extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$first<typeof x>;
}
