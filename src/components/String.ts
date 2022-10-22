import { Cast } from "./Cast";
import { Kind } from "./Kind";

export declare namespace String {
  export type _$beginsWith<
    Prefix extends string,
    S extends string
  > = S extends `${Prefix}${string}` ? true : false;

  export abstract class $beginsWith<Sub extends string> extends Kind {
    abstract f: (x: Cast<Kind._, string>) => _$beginsWith<Sub, typeof x>;
  }

  export type _$endsWith<
    Postfix extends string,
    S extends string
  > = S extends `${string}${Postfix}` ? true : false;

  export abstract class $endsWith<Sub extends string> extends Kind {
    abstract f: (x: Cast<Kind._, string>) => _$endsWith<Sub, typeof x>;
  }
}
