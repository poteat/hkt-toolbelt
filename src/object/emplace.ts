import { $, Test, Type, Kind } from "..";

export type _$emplace<K extends string | number | symbol, V> = {
  [k in K]: V;
};

declare abstract class Emplace_T<
  K extends string | number | symbol
> extends Kind.Kind {
  abstract f: (x: this[Kind._]) => _$emplace<K, typeof x>;
}

export declare abstract class Emplace extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], string | number | symbol>
  ) => Emplace_T<typeof x>;
}

type Emplace_Spec = [
  /**
   * Can emplace a '1' into key 'a'.
   */
  Test.Expect<$<$<Emplace, "a">, 1>, { a: 1 }>
];
