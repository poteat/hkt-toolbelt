import { $, String, Test, Kind, List } from '..';

type ComposablePair_Spec = [
  /**
   * Simple list operations should be composable.
   */
  Test.Expect<
    Kind._$composablePair<[$<List.Push, 'foo'>, $<List.Unshift, 'bar'>]>
  >,

  /**
   * A list push (on strings) and a string.join should be composable.
   */
  Test.Expect<Kind._$composablePair<[$<String.Join, ''>, $<List.Push, 'foo'>]>>,

  /**
   * The empty tuple should emit an error.
   */
  // @ts-expect-error
  Kind._$composablePair<[]>
];
