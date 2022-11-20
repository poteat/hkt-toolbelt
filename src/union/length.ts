import { Kind, Union, Type } from "..";

export type _$length<T> = Type._$isNever<T> extends true
  ? 0
  : Union._$toList<T> extends infer X extends unknown[]
  ? X["length"]
  : never;

export declare abstract class Length extends Kind.Kind {
  abstract f: (x: this[Kind._]) => _$length<typeof x>;
}
