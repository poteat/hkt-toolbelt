import { Conditional } from "hkt-toolbelt";

type IsNever<X> = Conditional._$equals<X, never>;

declare class ᛰ {
  readonly ᛰ: symbol;
}

export declare namespace Test {
  export type Expect<
    X extends Conditional._$equals<X, V> extends true ? V : V & ᛰ,
    V = true
  > = IsNever<X> extends true ? Expect<X, V> : X;

  export type ExpectNot<
    X extends Conditional._$equals<X, V> extends true ? V : V & ᛰ,
    V = false
  > = IsNever<X> extends true ? Expect<X, V> : X;
}

export default Test;
