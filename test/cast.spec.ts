import $, { Cast, Test } from "hkt-toolbelt";

type Cast_Spec = [
  /**
   * Can cast a type to itself.
   */
  Test.Expect<Cast<true, true>, true>,

  /**
   * Can cast a type to a subtype.
   */
  Test.Expect<Cast<boolean, true>, true>,

  /**
   * Casting to a supertype keeps the type narrow.
   */
  Test.Expect<Cast<true, boolean>, true>
];
