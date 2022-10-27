import { Cast, Conditional, Kind, List } from ".";

export type _$startsWith<
  Prefix extends string,
  S extends string
> = S extends `${Prefix}${string}` ? true : false;

export abstract class StartsWith<Prefix extends string> extends Kind {
  abstract f: (x: Cast<this[Kind._], string>) => _$startsWith<Prefix, typeof x>;
}

export type _$endsWith<
  Suffix extends string,
  S extends string
> = S extends `${string}${Suffix}` ? true : false;

export abstract class EndsWith<Suffix extends string> extends Kind {
  abstract f: (x: Cast<this[Kind._], string>) => _$endsWith<Suffix, typeof x>;
}

export type _$includes<
  Infix extends string,
  S extends string
> = S extends `${string}${Infix}${string}` ? true : false;

export abstract class Includes<Infix extends string> extends Kind {
  abstract f: (x: Cast<this[Kind._], string>) => _$includes<Infix, typeof x>;
}

export type _$append<Suffix extends string, S extends string> = `${S}${Suffix}`;

export abstract class Append<Suffix extends string> extends Kind {
  abstract f: (x: Cast<this[Kind._], string>) => _$append<Suffix, typeof x>;
}

export type _$prepend<
  Prefix extends string,
  S extends string
> = `${Prefix}${S}`;

export abstract class Prepend<Prefix extends string> extends Kind {
  abstract f: (x: Cast<this[Kind._], string>) => _$prepend<Prefix, typeof x>;
}

type _$simpleSplit<S extends string> = string extends S
  ? [string]
  : S extends `${infer Head}${infer Tail}`
  ? [Head, ..._$simpleSplit<Tail>]
  : [];

export type _$isTemplate<S extends string> = string extends S
  ? false
  : List._$some<Conditional.Equals<string>, _$simpleSplit<S>>;

export abstract class IsTemplate extends Kind {
  abstract f: (x: Cast<this[Kind._], string>) => _$isTemplate<typeof x>;
}

export type _$join<
  T extends string[],
  D extends string = ""
> = List._$isVariadic<T> extends true
  ? string
  : T extends [infer Head, ...infer Tail]
  ? Tail extends []
    ? Head
    : `${Cast<Head, string>}${D}${_$join<Cast<Tail, string[]>, D>}`
  : string[] extends T
  ? string
  : "";

export abstract class Join<D extends string = ""> extends Kind {
  abstract f: (x: Cast<this[Kind._], string[]>) => _$join<typeof x, D>;
}

export type _$split<
  S extends string,
  Delimiter extends string = ""
> = _$isTemplate<Delimiter> extends true
  ? string[]
  : string extends Delimiter
  ? string[]
  : S extends `${infer Head}${Delimiter}${infer Tail}`
  ? [Head, ..._$split<Tail, Delimiter>]
  : S extends Delimiter
  ? []
  : [S];

export abstract class Split<Delimiter extends string = ""> extends Kind {
  abstract f: (x: Cast<this[Kind._], string>) => _$split<typeof x, Delimiter>;
}

export * as String from "./string";
