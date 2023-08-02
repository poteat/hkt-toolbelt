import { $, Test, List } from ".."

type Repeat_Spec = [
  /**
   * Can create a tuple of length 0
   */
  Test.Expect<$<$<List.Repeat, 0>, "0">, []>,

  /**
   * N = 8
   */
  Test.Expect<$<$<List.Repeat, 8>, "0">, ["0", "0", "0", "0", "0", "0", "0", "0"]>,

  /**
   * N = 10
   */
  Test.Expect<$<$<List.Repeat, 10>, null>, [null, null, null, null, null, null, null, null, null, null]>,
  Test.Expect<$<$<List.Repeat, 5>, null>, [null, null, null, null, null]>,

  /**
   * Correctly handles tuple type input.
   */
  Test.Expect<$<$<List.Repeat, 3>, $<List.Times, 3>>, [[0, 1, 2], [0, 1, 2], [0, 1, 2]]>,

  /**
   * Correctly handles repeating union type input.
   */
  Test.Expect<$<$<List.Repeat, 3>, string | number | undefined>, [string | number | undefined, string | number | undefined, string | number | undefined]>,

  /**
   * Returns `never` for non-natural numbers.
   */
  Test.Expect<$<$<List.Repeat, -1>, "a">, never>,

  /**
   * Returns a fixed-length tuple that is non-variadic.
   */
  Test.ExpectNot<$<List.IsVariadic, $<$<List.Repeat, 10>, null>>>,
];
