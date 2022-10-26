import { Conditional } from ".";

type IsNever<X> = Conditional._$equals<X, never>;

abstract class _ {
  abstract readonly _: symbol;
}

export type Expect<
  X extends Conditional._$equals<X, V> extends true ? V : V & _,
  V = true
> = IsNever<X> extends true ? Expect<X, V> : X;

export type ExpectNot<
  X extends Conditional._$equals<X, V> extends true ? V : V & _,
  V = false
> = IsNever<X> extends true ? Expect<X, V> : X;

export * as Test from "./test";
