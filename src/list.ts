import $, { Boolean, Cast, Kind } from ".";

export type _$map<F extends Kind, X extends unknown[]> = {
  [key in keyof X]: $<F, Cast<X[key], Kind.InputOf<F>>>;
};

export abstract class Map<F extends Kind> extends Kind {
  abstract f: (x: Cast<this[Kind._], unknown[]>) => _$map<F, typeof x>;
}

export type _$find<F extends Kind, X extends unknown[]> = X extends [
  infer Head,
  ...infer Tail
]
  ? $<F, Cast<Head, Kind.InputOf<F>>> extends true
    ? Head
    : _$find<F, Tail>
  : never;

export abstract class Find<F extends Kind<(x: never) => boolean>> extends Kind {
  abstract f: (x: Cast<this[Kind._], Kind.InputOf<F>[]>) => _$find<F, typeof x>;
}

export type _$filter<
  F extends Kind,
  X extends unknown[],
  O extends unknown[] = []
> = X extends [infer Head, ...infer Tail]
  ? $<F, Cast<Head, Kind.InputOf<F>>> extends true
    ? _$filter<F, Tail, [...O, Head]>
    : _$filter<F, Tail, O>
  : O;

export abstract class Filter<
  F extends Kind<(x: never) => boolean>
> extends Kind {
  abstract f: (
    x: Cast<this[Kind._], Kind.InputOf<F>[]>
  ) => _$filter<F, typeof x>;
}

export type _$includes<F extends Kind, X extends unknown[]> = X extends [
  infer Head,
  ...infer Tail
]
  ? $<F, Cast<Head, Kind.InputOf<F>>> extends true
    ? true
    : _$includes<F, Tail>
  : false;

export abstract class Includes<
  F extends Kind<(x: never) => boolean>
> extends Kind {
  abstract f: (
    x: Cast<this[Kind._], Kind.InputOf<F>[]>
  ) => _$includes<F, typeof x>;
}

export type _$push<X, T extends unknown[]> = [...T, X];

export abstract class Push<X> extends Kind {
  abstract f: (x: Cast<this[Kind._], unknown[]>) => _$push<X, typeof x>;
}

export type _$unshift<X, T extends unknown[]> = [X, ...T];

export abstract class Unshift<X> extends Kind {
  abstract f: (x: Cast<this[Kind._], unknown[]>) => _$unshift<X, typeof x>;
}

export type _$first<T extends unknown[]> = T extends [] ? never : T[0];

export abstract class First extends Kind {
  abstract f: (x: Cast<this[Kind._], unknown[]>) => _$first<typeof x>;
}

export type _$last<T extends unknown[]> = T extends [infer X]
  ? X
  : T extends [unknown, ...infer Tail]
  ? _$last<Tail>
  : T extends [...unknown[], infer X]
  ? X
  : T[number];

export abstract class Last extends Kind {
  abstract f: (x: Cast<this[Kind._], unknown[]>) => _$last<typeof x>;
}

export type _$pair<
  T extends unknown[],
  O extends unknown[][] = []
> = T extends [infer X1, infer X2, ...infer Rest]
  ? _$pair<[X2, ...Rest], [...O, [X1, X2]]>
  : number extends T["length"]
  ? [T[number], T[number]][]
  : O;

export abstract class Pair extends Kind {
  abstract f: (x: Cast<this[Kind._], unknown[]>) => _$pair<typeof x>;
}

export type _$every<
  F extends Kind<(x: never) => boolean>,
  T extends unknown[],
  O extends boolean = true
> = T extends [infer Head, ...infer Rest]
  ? _$every<F, Rest, Boolean._$and<O, $<F, Cast<Head, Kind.InputOf<F>>>>>
  : O;

export abstract class Every<
  F extends Kind<(x: never) => boolean>
> extends Kind {
  abstract f: (
    x: Cast<this[Kind._], Kind.InputOf<F>[]>
  ) => _$every<F, typeof x>;
}

export type _$some<
  F extends Kind<(x: never) => boolean>,
  T extends unknown[],
  O extends boolean = false
> = T extends [infer Head, ...infer Rest]
  ? _$some<F, Rest, Boolean._$or<O, $<F, Cast<Head, Kind.InputOf<F>>>>>
  : O;

export abstract class Some<F extends Kind<(x: never) => boolean>> extends Kind {
  abstract f: (x: Cast<this[Kind._], Kind.InputOf<F>[]>) => _$some<F, typeof x>;
}

type _$reverse2<T extends unknown[], O extends unknown[] = []> = T extends [
  ...infer Init,
  infer Last
]
  ? Init extends []
    ? [...O, Last]
    : _$reverse2<Init, [...O, Last]>
  : T extends [infer Head, ...unknown[]]
  ? Head
  : [...O, ...T];

export type _$reverse<
  T extends unknown[],
  O extends unknown[] = []
> = T extends [infer Head, ...infer Tail]
  ? _$reverse<Tail, [Head, ...O]>
  : T extends []
  ? O
  : [..._$reverse2<T>, ...O];

export abstract class Reverse extends Kind {
  abstract f: (x: Cast<this[Kind._], unknown[]>) => _$reverse<typeof x>;
}

export type _$isVariadic<T extends unknown[]> = number extends T["length"]
  ? true
  : false;

export abstract class IsVariadic extends Kind {
  abstract f: (x: Cast<this[Kind._], unknown[]>) => _$isVariadic<typeof x>;
}

export * as List from "./list";
