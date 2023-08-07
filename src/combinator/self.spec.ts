import { $, Combinator, Test } from '..'

type Self_Spec = [
  /**
   * Self must return itself.
   */
  Test.Expect<$<Combinator.Self, true>, Combinator.Self>,

  /**
   * Can be applied an arbitrary amount of times.
   */
  $<$<$<Combinator.Self, 0>, 0>, 0>
]
