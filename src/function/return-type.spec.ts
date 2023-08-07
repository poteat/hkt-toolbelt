import { $, Test, Function } from "..";

type ReturnType_Spec = [
  /**
   * Should extract the return type of a function.
   */
  Test.Expect<$<Function.ReturnType, () => number>, number>,

  /**
   * Should extract the return type of an async function.
   */
  Test.Expect<$<Function.ReturnType, () => Promise<string>>, Promise<string>>,

  /**
   * Should extract the return type of a generic function.
   */
  Test.Expect<$<Function.ReturnType, <T>(a: T) => T>, unknown>,

  /**
   * Running 'ReturnType' on a non-function type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<Function.ReturnType, number>>
];
