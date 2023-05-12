import { $, Test, Parser2, Stress } from '..'

type Literal_Spec = [
  /**
   * Can match a string literal of length 10.
   */
  Test.Expect<
    $<
      $<Parser2.Literal, Stress.TenString>,
      { input: Stress.TenString; result: never }
    >,
    { input: ''; result: Stress.TenString }
  >,

  /**
   * Can match a string literal of length 100.
   */
  Test.Expect<
    $<
      $<Parser2.Literal, Stress.HundredString>,
      { input: Stress.HundredString; result: never }
    >,
    { input: ''; result: Stress.HundredString }
  >,

  /**
   * Can match a string literal of length 1000.
   */
  Test.Expect<
    $<
      $<Parser2.Literal, Stress.ThousandString>,
      { input: Stress.ThousandString; result: never }
    >,
    { input: ''; result: Stress.ThousandString }
  >
]
