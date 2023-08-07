import { $, Test, Combinator, String } from '..';

type Rewrite = $<Combinator.FixSequence, $<$<String.Replace, 'xyz'>, 'x'>>;

type FixSequence_Spec = [
  /**
   * May execute term-rewriting systems.
   */
  Test.Expect<$<Rewrite, 'zyxyzyzyz'>, ['zyxyzyzyz', 'zyxyzyz', 'zyxyz', 'zyx']>
];
