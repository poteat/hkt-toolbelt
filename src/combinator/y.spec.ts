import {
  $,
  Kind,
  NaturalNumber,
  Conditional,
  Function,
  List,
  Test,
  Combinator
} from '..'

/**
 * 'ToZero' kind represents a pipeline that checks if the input number is zero
 * and returns 0 in such scenario.
 *
 * Otherwise, it triggers a decrement.
 */
type ToZero = $<
  Combinator.Y,
  $<
    Kind.Pipe,
    [
      $<Kind.Pipe, [$<List.PushBy, [NaturalNumber.Decrement]>, Kind.Pipe]>,
      $<$<Conditional.If, $<Conditional.Equals, 0>>, Function.Identity>
    ]
  >
>

type Result = $<ToZero, 21>

type Y_Spec = [
  /**
   * Testing the application of recursive kind `F`, `ApplyToY` to 'Y'
   */
  Test.Expect<Result, 0>,

  /**
   * Enforces 'Y' kind inputs.
   */
  // @ts-expect-error
  Test.Expect<$<Y, number>, number>,

  /**
   * 'Y' will emit an error on non-kinds.
   */
  // @ts-expect-error
  Test.Expect<$<Y, number>, number>
]
