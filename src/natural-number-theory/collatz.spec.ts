import { $, Test, NaturalNumberTheory } from '..';

type CollatzSequence_Spec = [
  /**
   * Collatz[3922] -> 1961
   */
  Test.Expect<$<NaturalNumberTheory.Collatz, 3922>, 1961>,

  /**
   * Collatz sequence of 39
   */
  Test.Expect<
    $<NaturalNumberTheory.CollatzSequence, 39>,
    [
      39,
      118,
      59,
      178,
      89,
      268,
      134,
      67,
      202,
      101,
      304,
      152,
      76,
      38,
      19,
      58,
      29,
      88,
      44,
      22,
      11,
      34,
      17,
      52,
      26,
      13,
      40,
      20,
      10,
      5,
      16,
      8,
      4,
      2,
      1
    ]
  >
];
