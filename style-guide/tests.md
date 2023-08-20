# Test Documentation Guide

All exported utilities must be tested using the `Test` utility.

Test utilities are usually of the structure:

```ts
export type Utility_Spec = [
  /**
   * Description of the test case.
   */
  Test.Expect<$<Utility, Input>, ExpectedOutput>,
  ...
]
```

In this case, we document each test case with a JSDoc comment. The comment should describe what the test case is testing.

```ts
export type Sign_Spec = [
  /**
   * Can get the sign of a positive number.
   */
  Test.Expect<$<Number.Sign, 42>, '+'>,

  /**
   * Can get the sign of a negative number.
   */
  Test.Expect<$<Number.Sign, -42>, '-'>,

  /**
   * Can get the sign of zero.
   */
  Test.Expect<$<Number.Sign, 0>, '+'>,

  /**
   * Can get the sign of a positive floating point number.
   */
  Test.Expect<$<Number.Sign, 42.42>, '+'>,

  /**
   * Can get the sign of a negative floating point number.
   */
  Test.Expect<$<Number.Sign, -42.42>, '-'>,

  /**
   * The sign of `number` is plus or minus.
   */
  Test.Expect<$<Number.Sign, number>, '+' | '-'>
]
```

In all cases, adequate descriptions should be provided. The descriptions should clearly explain what each test case is testing.
