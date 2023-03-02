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
   * Has 'never' for non-natural numbers.
   */
  Test.Expect<$<$<List.Repeat, -1>, "a">, never>
]
