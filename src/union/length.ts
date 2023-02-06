import { Kind, Union, Type } from "..";

export type _$length<T> = Type._$isNever<T> extends true
  ? 0
  : Union._$toList<T> extends infer X extends unknown[]
  ? X["length"]
  : never;

export interface Length extends Kind.Kind {
  f(x: this[Kind._]): _$length<typeof x>;
}
