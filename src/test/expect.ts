import { Conditional, Test } from "..";

export abstract class _ {
  abstract readonly _: symbol;
}

export type Expect<
  X extends Conditional._$equals<X, V> extends true ? V : V & _,
  V = true
> = Test._$isNever<V> extends true
  ? X
  : Test._$isNever<X> extends true
  ? Expect<X, V>
  : X;
