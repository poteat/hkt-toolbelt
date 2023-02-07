import { Type, Kind, List } from "..";

export type _$join<
  T extends string[],
  D extends string = "",
  O extends string = ""
> = List._$isVariadic<T> extends true
  ? string
  : T extends [infer Head, ...infer Tail]
  ? Tail extends []
    ? `${O}${O extends "" ? "" : D}${Type._$cast<Head, string>}`
    : _$join<
        Type._$cast<Tail, string[]>,
        D,
        `${O}${O extends "" ? "" : D}${Type._$cast<Head, string>}`
      >
  : string[] extends T
  ? `${O}${string}`
  : O;

interface Join_T<D extends string> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string[]>): _$join<typeof x, D>;
}

export interface Join extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): Join_T<typeof x>;
}
