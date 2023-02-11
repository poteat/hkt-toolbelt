import { Kind, List, Type } from "..";

export type _$flatten<
  T extends unknown[],
  RESULT extends List.List = T extends [infer H, ...infer R]
  ? H extends unknown[]
    ? [..._$flatten<H>, ..._$flatten<R>]
    : [H, ..._$flatten<R>]
  : []
> = RESULT;

export interface Flatten extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$flatten<typeof x>;
}
