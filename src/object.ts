import $, { Cast, Kind, Type, Union } from ".";

export type _$keys<T extends Record<string, unknown>> = Union._$toTuple<
  keyof T
>;

export abstract class Keys extends Kind {
  abstract f: (
    x: Cast<this[Kind._], Record<string, unknown>>
  ) => _$keys<typeof x>;
}

export type _$values<T extends Record<string, unknown>, Keys = _$keys<T>> = {
  [key in keyof Keys]: T[Cast<Keys[key], keyof T>];
};

export abstract class Values extends Kind {
  abstract f: (
    x: Cast<this[Kind._], Record<string, unknown>>
  ) => _$values<typeof x>;
}

export type _$mapKeys<T extends Record<string, unknown>, F extends Kind> = {
  [key in keyof T as $<F, Cast<key, Kind.InputOf<F>>>]: T[key];
};

export abstract class MapKeys<
  F extends Kind<(x: string) => string>
> extends Kind {
  abstract f: (
    x: Cast<this[Kind._], Record<string, unknown>>
  ) => _$mapKeys<typeof x, F>;
}

export type _$mapValues<T extends Record<string, unknown>, F extends Kind> = {
  [key in keyof T]: $<F, Cast<T[key], Kind.InputOf<F>>>;
};

export abstract class MapValues<F extends Kind> extends Kind {
  abstract f: (
    x: Cast<this[Kind._], Record<string, Kind.InputOf<F>>>
  ) => _$mapValues<typeof x, F>;
}

type RecursiveKindInput<F extends Kind> =
  | Kind.InputOf<F>
  | Record<string, Kind.InputOf<F>>
  | {
      [key: string]: RecursiveKindInput<F>;
    };

export type _$deepMap<F extends Kind, O> = {
  [key in keyof O]: Type._$display<
    O[key] extends Record<string, unknown>
      ? _$deepMap<F, O[key]>
      : $<F, Cast<O[key], Kind.InputOf<F>>>
  >;
};

export abstract class DeepMap<F extends Kind> extends Kind {
  abstract f: (
    x: Cast<this[Kind._], RecursiveKindInput<F>>
  ) => _$deepMap<F, typeof x>;
}

type _$paths2<T, O extends unknown[] = []> =
  | {
      [K in keyof T]: T[K] extends Record<string, unknown>
        ? _$paths2<T[K], [...O, K]>
        : [...O, K];
    }[keyof T]
  | O;

export type _$paths<T, U = _$paths2<T>> = Union._$toTuple<
  U extends [] ? never : U
>;

export abstract class Paths extends Kind {
  abstract f: (
    x: Cast<this[Kind._], Record<string, unknown>>
  ) => _$paths<typeof x>;
}

export type _$at<K extends keyof T, T extends Record<string, unknown>> = T[K];

export abstract class At<K extends string | symbol> extends Kind {
  abstract f: (x: Cast<this[Kind._], Record<K, unknown>>) => _$at<K, typeof x>;
}

export type _$atPath<Path extends (string | symbol)[], T> = Path extends [
  infer Head,
  ...infer Tail
]
  ? Tail extends []
    ? Head extends keyof T
      ? T[Head]
      : never
    : _$atPath<Cast<Tail, (string | symbol)[]>, T[Cast<Head, keyof T>]>
  : never;

export abstract class AtPath<Path extends (string | symbol)[]> extends Kind {
  abstract f: (
    x: Cast<this[Kind._], Record<string, unknown>>
  ) => _$atPath<Path, typeof x>;
}

export * as Object from "./object";
