import { Cast, Kind } from "hkt-toolbelt";

export declare namespace String {
  export type _$startsWith<
    Prefix extends string,
    S extends string
  > = S extends `${Prefix}${string}` ? true : false;

  export abstract class StartsWith<Sub extends string> extends Kind {
    abstract f: (x: Cast<this[Kind._], string>) => _$startsWith<Sub, typeof x>;
  }

  export type _$endsWith<
    Postfix extends string,
    S extends string
  > = S extends `${string}${Postfix}` ? true : false;

  export abstract class EndsWith<Sub extends string> extends Kind {
    abstract f: (x: Cast<this[Kind._], string>) => _$endsWith<Sub, typeof x>;
  }
}

export default String;
