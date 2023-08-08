import { $, Kind, NaturalNumber, List, Test } from '..'

type Iterate_Stress_Spec = [
  /**
   * 1 + 2 * 999 = 1999
   */
  Test.Expect<
    $<$<$<List.Iterate, $<NaturalNumber.Add, 2>>, 1000>, 1>[999],
    1999
  >,

  /**
   * 1 + 2 * 4499 = 8999. This computation is composed of 4500 additions.
   *
   * i.e. 1 + 2 + 2 + 2 + 2 (4500 times) = 8999
   */
  Test.Expect<
    $<$<$<List.Iterate, $<NaturalNumber.Add, 2>>, 4500>, 1>[4499],
    8999
  >,

  /**
   * If we multiply 1 by 3, then modulo by 10, we get 3. If we perform that
   * operation 1000 times, we get 7.
   *
   * e.g. runtime equivalent code would be:
   *
   * ```ts
   * let x = 1
   *
   * for (let i = 0; i < 1000; i++) {
   *   x = (x * 3) % 10
   * }
   *
   * console.log(x) // 7
   * ```
   */
  Test.Expect<
    $<
      $<
        $<
          List.Iterate,
          $<
            Kind.Pipe,
            [$<NaturalNumber.Multiply, 3>, $<NaturalNumber.ModuloBy, 10>]
          >
        >,
        1000
      >,
      1
    >[999],
    7
  >,

  /**
   * If we multiply 1 by 3, then modulo by 10, we get 3. If we perform that
   * operation 7000 times, we get 7.
   */
  Test.Expect<
    $<
      $<
        $<
          List.Iterate,
          $<
            Kind.Pipe,
            [$<NaturalNumber.Multiply, 3>, $<NaturalNumber.ModuloBy, 10>]
          >
        >,
        7000
      >,
      1
    >[6999],
    7
  >
]
