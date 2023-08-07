import { $, Test, List } from '..'

type Range_Spec = [
  Test.Expect<$<$<$<List.Range, 0>, 10>, 1>, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]>,

  Test.Expect<$<$<$<List.Range, 10>, 0>, -2>, [10, 8, 6, 4, 2]>,

  Test.Expect<$<$<$<List.Range, 10>, 0>, -1>, [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]>,

  /**
   * Returns empty array if the difference between START and STOP is less than the absolute value of STEP
   */
  Test.Expect<$<$<$<List.Range, 100>, 100>, -2>, []>,
  Test.Expect<$<$<$<List.Range, 100>, 99>, -2>, []>,

  /**
   * Returns `never` if START or STOP are not natural numbers.
   */
  Test.Expect<$<$<$<List.Range, -1>, -100>, -2>, never>,
  Test.Expect<$<$<$<List.Range, 1.5>, 100>, 1>, never>,

  /**
   * Returns `never` if STEP is a non-integer.
   */
  Test.Expect<$<$<$<List.Range, 1>, 100>, 1.5>, never>,

  /**
   * Retursn `never` if the sign of STEP is incompatible with the range provided by START and STOP.
   */
  Test.Expect<$<$<$<List.Range, 1>, 100>, -2>, never>,
  Test.Expect<$<$<$<List.Range, 100>, 0>, 2>, never>
]
