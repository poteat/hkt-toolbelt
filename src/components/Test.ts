import { Conditional } from "hkt-toolbelt";

type IsNever<X> = Conditional._$equals<X, never>;

export declare namespace Test {
  export type Expect<X extends true> = IsNever<X> extends true ? Expect<X> : X;

  export type ExpectNot<X extends false> = IsNever<X> extends true
    ? ExpectNot<X>
    : X;
}

export default Test;
