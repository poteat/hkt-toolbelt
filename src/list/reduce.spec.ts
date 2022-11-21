import { $, Test, List, NaturalNumber } from "..";

type Reduce_Spec = [
  /**
   * Can reduce a list of numbers to their sum.
   */
  Test.Expect<$<List.Reduce<NaturalNumber.Add, 0>, [2, 2]>, "4">,

  /**
   * Can handle large lists to add.
   */
  Test.Expect<
    $<
      List.Reduce<NaturalNumber.Add, 0>,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    >,
    "210"
  >,

  /**
   * Can handle a list of 100 elements.
   */
  Test.Expect<$<List.Reduce<NaturalNumber.Add, 0>, Hundred>, "550">,

  /**
   * Can handle a list of 500 elements.
   */
  Test.Expect<$<List.Reduce<NaturalNumber.Add, 0>, FiveHundred>, "2750">,

  /**
   * Can handle a list of 1000 elements.
   */
  Test.Expect<$<List.Reduce<NaturalNumber.Add, 0>, Thousand>, "5500">
];

type Ten = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

type Hundred = [
  ...Ten,
  ...Ten,
  ...Ten,
  ...Ten,
  ...Ten,
  ...Ten,
  ...Ten,
  ...Ten,
  ...Ten,
  ...Ten
];

type FiveHundred = [...Hundred, ...Hundred, ...Hundred, ...Hundred, ...Hundred];

type Thousand = [...FiveHundred, ...FiveHundred];
