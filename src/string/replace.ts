import { Type, Kind, String } from '..';

type _$replace2<
  S extends string,
  From extends string,
  To extends string,
  O extends string = ''
> = S extends `${infer Head}${From}${infer Tail}`
  ? _$replace2<Tail, From, To, `${O}${Head}${To}`>
  : `${O}${S}`;

export type _$replace<
  S extends string,
  From extends string,
  To extends string
> = String._$isTemplate<From> extends true
  ? string
  : string extends From
  ? string
  : From extends ''
  ? `${To}${_$replace2<S, From, To>}`
  : _$replace2<S, From, To>;

interface Replace_T2<From extends string, To extends string> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$replace<typeof x, From, To>;
}

interface Replace_T<From extends string> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): Replace_T2<From, typeof x>;
}

export interface Replace extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): Replace_T<typeof x>;
}
