import { $, Function, Kind, Test } from '..';

type Reify_Spec = [
  /**
   * The return type of a reified type is unknown.
   */
  Test.Expect<ReturnType<$<Kind.Reify, Function.Identity>>, unknown>
];
