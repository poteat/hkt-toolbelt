import { Type, Kind } from '..';

export type _$emplace<K extends string | number | symbol, V> = {
  [k in K]: V;
};

interface Emplace_T<K extends string | number | symbol> extends Kind.Kind {
  f(x: this[Kind._]): _$emplace<K, typeof x>;
}

export interface Emplace extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], string | number | symbol>
  ): Emplace_T<typeof x>;
}
