import $, { Test, Boolean } from "../../src";

type And_Spec = [
  /**
   * True && True = True
   */
  Test.Expect<$<Boolean.And<true>, true>>,

  /**
   * True && False = False
   */
  Test.ExpectNot<$<Boolean.And<true>, false>>,

  /**
   * False && True = False
   */
  Test.ExpectNot<$<Boolean.And<false>, true>>,

  /**
   * False && False = False
   */
  Test.ExpectNot<$<Boolean.And<false>, false>>,

  /**
   * Running 'And' on a non-boolean type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<Boolean.And<true>, number>>
];

type Or_Spec = [
  /**
   * True || True = True
   */
  Test.Expect<$<Boolean.Or<true>, true>>,

  /**
   * True || False = True
   */
  Test.Expect<$<Boolean.Or<true>, false>>,

  /**
   * False || True = True
   */
  Test.Expect<$<Boolean.Or<false>, true>>,

  /**
   * False || False = False
   */
  Test.ExpectNot<$<Boolean.Or<false>, false>>
];

type Not_Spec = [
  /**
   * !True = False
   */
  Test.Expect<$<Boolean.Not, false>>,

  /**
   * !False = True
   */
  Test.ExpectNot<$<Boolean.Not, true>>,

  /**
   * Running 'Not' on a non-boolean type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<Boolean.Not, number>>
];
