# Test Documentation Guide

All exported utilities must be tested using the `Test` utility.

Test utilities are usually of the structure:

```ts
/**
 * Description of the test case.
 */
type Test1 = Test.Expect<$<Utility, Input>, ExpectedOutput>

/**
 * Description of the test case.
 */
type Test2 = Test.Expect<$<Utility, Input>, ExpectedOutput>

...
```

In this case, we document each test case with a JSDoc comment. The comment should describe what the test case is testing.

```ts
/**
 * Can get the sign of a positive number.
 */
type Test1 = Test.Expect<$<Number.Sign, 42>, '+'>

/**
 * Can get the sign of a negative number.
 */
type Test2 = Test.Expect<$<Number.Sign, -42>, '-'>

/**
 * Can get the sign of zero.
 */
type Test3 = Test.Expect<$<Number.Sign, 0>, '+'>

/**
 * Can get the sign of a positive floating point number.
 */
type Test4 = Test.Expect<$<Number.Sign, 42.42>, '+'>

/**
 * Can get the sign of a negative floating point number.
 */
type Test5 = Test.Expect<$<Number.Sign, -42.42>, '-'>

/**
 * The sign of `number` is plus or minus.
 */
type Test6 = Test.Expect<$<Number.Sign, number>, '+' | '-'>
```

In all cases, adequate descriptions should be provided. The descriptions should clearly explain what each test case is testing.
