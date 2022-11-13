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

type _$simpleSplit<S extends string, O extends string[] = []> = string extends S
  ? [string]
  : S extends `${infer Head}${infer Tail}`
  ? _$simpleSplit<Tail, [...O, Head]>
  : O;

export type _$isTemplate<S extends string> = string extends S
  ? false
  : List._$some<Conditional.Equals<string>, _$simpleSplit<S>>;

export abstract class IsTemplate extends Kind {
  abstract f: (x: Cast<this[Kind._], string>) => _$isTemplate<typeof x>;
}

export type _$join<
  T extends string[],
  D extends string = "",
  O extends string = ""
> = List._$isVariadic<T> extends true
  ? string
  : T extends [infer Head, ...infer Tail]
  ? Tail extends []
    ? `${O}${D}${Cast<Head, string>}`
    : _$join<
        Cast<Tail, string[]>,
        D,
        `${O}${O extends "" ? "" : D}${Cast<Head, string>}`
      >
  : string[] extends T
  ? `${O}${string}`
  : O;

export abstract class Join<D extends string = ""> extends Kind {
  abstract f: (x: Cast<this[Kind._], string[]>) => _$join<typeof x, D>;
}

export type _$split<
  S extends string,
  Delimiter extends string = "",
  O extends unknown[] = []
> = _$isTemplate<Delimiter> extends true
  ? string[]
  : string extends Delimiter
  ? string[]
  : S extends `${infer Head}${Delimiter}${infer Tail}`
  ? _$split<Tail, Delimiter, [...O, Head]>
  : S extends Delimiter
  ? O
  : [...O, S];

export abstract class Split<Delimiter extends string = ""> extends Kind {
  abstract f: (x: Cast<this[Kind._], string>) => _$split<typeof x, Delimiter>;
}

export type _$first<S extends string> = S extends `${infer Head}${string}`
  ? Head
  : string extends S
  ? S
  : "";

export abstract class First extends Kind {
  abstract f: (x: Cast<this[Kind._], string>) => _$first<typeof x>;
}

export type _$last<S extends string> = S extends `${string}${infer Tail}`
  ? Tail extends ""
    ? S
    : _$last<Tail>
  : string extends S
  ? S
  : "";

export abstract class Last extends Kind {
  abstract f: (x: Cast<this[Kind._], string>) => _$last<typeof x>;
}

export type _$tail<S extends string> = S extends `${string}${infer Tail}`
  ? Tail extends ""
    ? S
    : Tail
  : string extends S
  ? S
  : "";

export abstract class Tail extends Kind {
  abstract f: (x: Cast<this[Kind._], string>) => _$tail<typeof x>;
}

type _$init2<
  S extends string,
  O extends string = ""
> = S extends `${infer Head}${infer Tail}`
  ? Tail extends ""
    ? O
    : _$init2<Tail, `${O}${Head}`>
  : O;

export type _$init<S extends string> = string extends S ? string : _$init2<S>;

export abstract class Init extends Kind {
  abstract f: (x: Cast<this[Kind._], string>) => _$init<typeof x>;
}

type _$replace2<
  S extends string,
  From extends string,
  To extends string,
  O extends string = ""
> = S extends `${infer Head}${From}${infer Tail}`
  ? _$replace2<Tail, From, To, `${O}${Head}${To}`>
  : `${O}${S}`;

export type _$replace<
  S extends string,
  From extends string,
  To extends string
> = _$isTemplate<From> extends true
  ? string
  : string extends From
  ? string
  : From extends ""
  ? `${To}${_$replace2<S, From, To>}`
  : _$replace2<S, From, To>;

export abstract class Replace<
  From extends string,
  To extends string
> extends Kind {
  abstract f: (x: Cast<this[Kind._], string>) => _$replace<typeof x, From, To>;
}

export type _$reverse<
  S extends string,
  O extends string = ""
> = S extends `${infer Head}${infer Tail}`
  ? _$reverse<Tail, `${Head}${O}`>
  : `${string extends S ? string : ""}${O}`;

export abstract class Reverse extends Kind {
  abstract f: (x: Cast<this[Kind._], string>) => _$reverse<typeof x>;
}

export type _$isString<S extends unknown> = S extends string ? true : false;

export abstract class IsString extends Kind {
  abstract f: (x: this[Kind._]) => _$isString<typeof x>;
}

export type _$toUpper<S extends string> = Uppercase<S>;

export abstract class ToUpper extends Kind {
  abstract f: (x: Cast<this[Kind._], string>) => _$toUpper<typeof x>;
}

export type _$toLower<S extends string> = Lowercase<S>;

export abstract class ToLower extends Kind {
  abstract f: (x: Cast<this[Kind._], string>) => _$toLower<typeof x>;
}

export * as String from "./string";
