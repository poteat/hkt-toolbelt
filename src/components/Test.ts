export declare namespace Test {
  export type Expect<X extends true> = X;

  export type ExpectNot<X extends false> = X;
}

export default Test;
