import { Kind, Type } from "hkt-toolbelt";

export type _$fromString<T extends string> = T extends `${infer T extends
  | number
  | bigint}`
  ? T
  : never;

export interface FromString extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$fromString<typeof x>;
}
