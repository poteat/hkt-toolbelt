import { $, Combinator, Test, Kind } from '..';

type RecursiveKind_Spec = [
  /**
   * A RecursiveKind is a kind that takes in itself.
   */
  Test.Expect<
    Kind._$inputOf<Combinator.RecursiveKind>,
    Combinator.RecursiveKind
  >,

  /**
   * A RecursiveKind can be applied to itself.
   */
  $<Combinator.RecursiveKind, Combinator.RecursiveKind>
];
