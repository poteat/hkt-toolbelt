import { $ } from "./$";
import { Cast } from "./Cast";
import { Function } from "./Function";

export declare namespace Kind {
  const _: unique symbol;

  export type _ = typeof _;

  export type _$compose<FX extends Kind[], X> = FX extends [
    ...infer Init,
    infer Last
  ]
    ? _$compose<Cast<Init, Kind[]>, $<Cast<Last, Kind>, X>>
    : X;

  export abstract class $compose<FX extends Kind[]> extends Kind {
    abstract f: (x: this[Kind._]) => _$compose<FX, typeof x>;
  }
}

declare const Kind2: typeof Kind;

export declare abstract class Kind {
  abstract readonly [Kind2._]: unknown;
  abstract f: Function;
}
