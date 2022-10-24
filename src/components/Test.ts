import { Conditional } from "hkt-toolbelt";

type IsNever<X> = Conditional._$equals<X, never>;

declare abstract class TypeError<_S extends string> {
  static readonly _: unique symbol;
}

export declare namespace Test {
  export type Expect<
    X extends Conditional._$equals<X, V> extends true
      ? V
      : V & [_: TypeError<"NotEqual">],
    V = true
  > = IsNever<X> extends true ? Expect<X, V> : X;

  export type ExpectNot<
    X extends Conditional._$equals<X, V> extends true
      ? V
      : V & [_: TypeError<"Equal">],
    V = false
  > = IsNever<X> extends true ? Expect<X, V> : X;
}

export default Test;
