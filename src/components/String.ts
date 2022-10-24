import { Cast, Kind } from "hkt-toolbelt";

export declare namespace String {
  export type _$startsWith<
    Prefix extends string,
    S extends string
  > = S extends `${Prefix}${string}` ? true : false;

  export abstract class StartsWith<Prefix extends string> extends Kind {
    abstract f: (
      x: Cast<this[Kind._], string>
    ) => _$startsWith<Prefix, typeof x>;
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

  export type _$append<
    Suffix extends string,
    S extends string
  > = `${S}${Suffix}`;

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
}

export default String;
