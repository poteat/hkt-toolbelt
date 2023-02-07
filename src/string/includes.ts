import { Type, Kind } from "..";

export type _$includes<
  Infix extends string,
  S extends string
> = S extends `${string}${Infix}${string}` ? true : false;

interface Includes_T<Infix extends string> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$includes<Infix, typeof x>;
}

export interface Includes extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): Includes_T<typeof x>;
}
