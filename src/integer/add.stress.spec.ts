import { $, Test, Integer, List } from "..";

export type Add_Spec = [
  /**
   * Can add large numbers.
   */
  Test.Expect<$<$<Integer.Add, -123456789>, -123456789>, -246913578>,

  /**
   * Can add numbers as strings.
   */
  Test.Expect<$<$<Integer.Add, "-123456789">, "-123456789">, -246913578>,

  /**
   * Can add very large numbers.
   */
  Test.Expect<
    $<$<Integer.Add, -9007199254740991>, -9007199254740991>,
    -18014398509481982
  >,

  /**
   * Can add bigint numbers.
   */
  Test.Expect<
    $<$<Integer.Add, 9007199254740991n>, 9007199254740991n>,
    18014398509481982
  >,

  /**
   * Can map and add over lists.
   */
  Test.Expect<
    $<$<List.Map, $<Integer.Add, -10>>, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]>,
    [-9, -8, -7, -6, -5, -4, -3, -2, -1, 0]
  >,

  /**
   * Can add a lot of negative numbers in a nested way.
   */
  Test.Expect<
    $<
      $<Integer.Add, -10>,
      $<
        $<Integer.Add, -10>,
        $<
          $<Integer.Add, -10>,
          $<
            $<Integer.Add, -10>,
            $<
              $<Integer.Add, -10>,
              $<
                $<Integer.Add, -10>,
                $<
                  $<Integer.Add, -10>,
                  $<
                    $<Integer.Add, -10>,
                    $<
                      $<Integer.Add, -10>,
                      $<
                        $<Integer.Add, -10>,
                        $<
                          $<Integer.Add, -10>,
                          $<
                            $<Integer.Add, -10>,
                            $<
                              $<Integer.Add, -10>,
                              $<
                                $<Integer.Add, -10>,
                                $<
                                  $<Integer.Add, -10>,
                                  $<
                                    $<Integer.Add, -10>,
                                    $<
                                      $<Integer.Add, -10>,
                                      $<
                                        $<Integer.Add, -10>,
                                        $<$<Integer.Add, -10>, -10>
                                      >
                                    >
                                  >
                                >
                              >
                            >
                          >
                        >
                      >
                    >
                  >
                >
              >
            >
          >
        >
      >
    >,
    -200
  >,

  /**
   * Can add numbers with hundreds of digits.
   */
  Test.Expect<
    $<
      $<
        Integer.Add,
        "123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789"
      >,
      "123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789"
    >,
    246913578246913578246913578246913578246913578246913578246913578246913578246913578246913578246913578246913578246913578246913578246913578246913578246913578246913578246913578246913578n
  >
];
