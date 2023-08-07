import { $, Test, Number, Conditional } from '..';

type Number_Spec = [
  /**
   * Numbers are a subtype of Number.
   */
  Test.Expect<$<$<Conditional.Extends, Number.Number>, 42>>,

  /**
   * BigInts are a subtype of Number.
   */
  Test.Expect<$<$<Conditional.Extends, Number.Number>, 9007199254740991n>>
];
