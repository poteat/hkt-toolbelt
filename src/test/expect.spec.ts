import { Test } from '..'

type Expect_Spec = [
  /**
   * Expect should pass compilation with a true type.
   */
  Test.Expect<true>,

  /**
   * Expect should emit an error on false type.
   */
  // @ts-expect-error
  Test.Expect<false>,

  /**
   * Expect should emit an error on non-boolean types.
   */
  // @ts-expect-error
  Test.Expect<number>,

  /**
   * Expect should emit an error on the never type.
   */
  // `@ts-ignore` is used here because `@ts-expect-error` results in "error TS2578: Unused '@ts-expect-error' directive."
  // @ts-ignore - error TS2589: Type instantiation is excessively deep and possibly infinite.
  Test.Expect<never, true>
]
