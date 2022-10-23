import $, { Boolean, Kind, Cast } from "hkt-toolbelt";

export declare namespace List {
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

  export abstract class Find<
    F extends Kind<(x: never) => boolean>
  > extends Kind {
    abstract f: (x: Cast<this[Kind._], unknown[]>) => _$find<F, typeof x>;
  }

  export type _$filter<F extends Kind, X extends unknown[]> = X extends [
    infer Head,
    ...infer Tail
  ]
    ? $<F, Cast<Head, Kind.InputOf<F>>> extends true
      ? [Head, ..._$filter<F, Tail>]
      : _$filter<F, Tail>
    : [];

  export abstract class Filter<
    F extends Kind<(x: never) => boolean>
  > extends Kind {
    abstract f: (x: Cast<this[Kind._], unknown[]>) => _$filter<F, typeof x>;
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
    abstract f: (x: Cast<this[Kind._], unknown[]>) => _$includes<F, typeof x>;
  }

  export type _$push<X, T extends unknown[]> = [...T, X];

  export abstract class Push<X> extends Kind {
    abstract f: (x: Cast<this[Kind._], unknown[]>) => _$push<X, typeof x>;
  }

  export type _$unshift<X, T extends unknown[]> = [X, ...T];

  export abstract class Unshift<X> extends Kind {
    abstract f: (x: Cast<this[Kind._], unknown[]>) => _$unshift<X, typeof x>;
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

  export type _$pair<T extends unknown[]> = T extends [
    infer X1,
    infer X2,
    ...infer Rest
  ]
    ? [[X1, X2], ..._$pair<[X2, ...Rest]>]
    : number extends T["length"]
    ? [T[number], T[number]][]
    : [];

  export abstract class Pair extends Kind {
    abstract f: (x: Cast<this[Kind._], unknown[]>) => _$pair<typeof x>;
  }

  export type _$every<
    F extends Kind<(x: never) => boolean>,
    T extends unknown[]
  > = T extends [infer Head, ...infer Rest]
    ? Boolean._$and<$<F, Cast<Head, Kind.InputOf<F>>>, _$every<F, Rest>>
    : true;

  export abstract class Every<
    F extends Kind<(x: never) => boolean>
  > extends Kind {
    abstract f: (
      x: Cast<this[Kind._], Kind.InputOf<F>[]>
    ) => _$every<F, typeof x>;
  }
}

export default List;
