import { $, Conditional, Test } from "..";

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
  Test.ExpectNot<$<$<Conditional.NotEquals, never>, never>>,

  /**
   * Deeply equals nested lists
   */
  Test.Expect<$<$<Conditional.NotEquals, [1, [2, [3, [4]]]]>, [1, [2, [3, [5]]]]>>,

  /**
   * Deeply equals nested objects
   */
  Test.Expect<$<$<Conditional.NotEquals, { a: 1, b: 2, c: { d: 3, e: { f: 4, g: [5, 6, 7], h: 8 | 9 | 10 } } }>, { a: 1, b: 2, c: { d: 3, e: { f: 4, g: [8, 9, 10], h: 5 | 6 | 7 } } }>>,
  
  /** 
   * Equals empty lists and objects
   */
  Test.Expect<$<$<Conditional.NotEquals, []>, [[]]>>,
  Test.Expect<$<$<Conditional.NotEquals, {}>, []>>,
];
