import { $, Conditional, Test } from "hkt-toolbelt"

type NotEquals_Spec = [
  /**
   * A type doesn't not equal itself.
   */
  Test.ExpectNot<$<$<Conditional.NotEquals, true>, true>>,

  /**
   * True does not equal false.
   */
  Test.Expect<$<$<Conditional.NotEquals, true>, false>>,

  /**
   * A supertype is not equal to its subtype.
   */
  Test.Expect<$<$<Conditional.NotEquals, true>, boolean>>,

  /**
   * Never is not equal to true.
   */
  Test.Expect<$<$<Conditional.NotEquals, true>, never>>,

  /**
   * True is not equal to never.
   */
  Test.Expect<$<$<Conditional.NotEquals, never>, true>>,

  /**
   * Never doesn't not equal never.
   */
  Test.ExpectNot<$<$<Conditional.NotEquals, never>, never>>
]
