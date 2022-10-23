import { Cast, Kind } from "hkt-toolbelt";

export declare namespace Boolean {
  export type _$and<T extends boolean, U extends boolean> = [T, U] extends [
    true,
    true
  ]
    ? true
    : false;

  export abstract class And<T extends boolean> extends Kind {
    abstract f: (x: Cast<this[Kind._], boolean>) => _$and<T, typeof x>;
  }

  export type _$not<T extends boolean> = T extends true ? false : true;

  export abstract class Not extends Kind {
    abstract f: (x: Cast<this[Kind._], boolean>) => _$not<typeof x>;
  }
}
