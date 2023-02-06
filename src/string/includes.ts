import { Type, Kind } from "..";

export type _$includes<
  Infix extends string,
  S extends string
> = S extends `${string}${Infix}${string}` ? true : false;

export interface Includes<Infix extends string> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$includes<Infix, typeof x>;
}
