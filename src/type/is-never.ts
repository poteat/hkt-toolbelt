import { Conditional, Kind } from "..";

export type _$isNever<X> = Conditional._$equals<X, never>;

export declare abstract class IsNever extends Kind.Kind {
  abstract f: (x: this[Kind._]) => _$isNever<typeof x>;
}
