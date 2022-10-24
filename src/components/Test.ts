import Conditional from "./Conditional";

type IsNever<X> = Conditional._$equals<X, never>;

declare class _ {
  readonly _: symbol;
}

export declare namespace Test {
  export type Expect<
    X extends Conditional._$equals<X, V> extends true ? V : V & _,
    V = true
  > = IsNever<X> extends true ? Expect<X, V> : X;

  export type ExpectNot<
    X extends Conditional._$equals<X, V> extends true ? V : V & _,
    V = false
  > = IsNever<X> extends true ? Expect<X, V> : X;
}

export default Test;
