import { $, Test, NaturalNumber } from "..";

type Multiply_Spec = [
  /**
   * 2 * 2 = 4
   */
  Test.Expect<$<$<NaturalNumber.Multiply, 2>, 2>, 4>,

  /**
   * 3 * 3 = 9
   */
  Test.Expect<$<$<NaturalNumber.Multiply, 3>, 3>, 9>,

  /**
   * 4 * 4 = 16
   */
  Test.Expect<$<$<NaturalNumber.Multiply, 4>, 4>, 16>,

  /**
   * 99 * 99 = 9801
   */
  Test.Expect<$<$<NaturalNumber.Multiply, 99>, 99>, 9801>,

  /**
   * 100 * 100 = 10000
   */
  Test.Expect<$<$<NaturalNumber.Multiply, 100>, 100>, 10000>,

  /**
   * 999 * 0 = 0
   */
  Test.Expect<$<$<NaturalNumber.Multiply, 999>, 0>, 0>,

  /**
   * 101 * 101 = 10201
   */
  Test.Expect<$<$<NaturalNumber.Multiply, 101>, 101>, 10201>,

  /**
   * 0 * 0 = 0
   */
  Test.Expect<$<$<NaturalNumber.Multiply, 0>, 0>, 0>,

  /**
   * Can multiply a lot of numbers in a nested way.
   */
  Test.Expect<
    $<
      $<NaturalNumber.Multiply, 555>,
      $<
        $<NaturalNumber.Multiply, 12345>,
        $<$<NaturalNumber.Multiply, 999>, 999>
      >
    >,
    6837778901475
  >,

  /**
   * Can multiply large numbers.
   */
  Test.Expect<
    $<$<NaturalNumber.Multiply, 123456789>, 123456789>,
    15241578750190521n
  >,

  /**
   * Can multiply very large numbers.
   */
  Test.Expect<
    $<$<NaturalNumber.Multiply, 9007199254740991>, 9007199254740991>,
    81129638414606663681390495662081n
  >,

  /**
   * Can multiply 90 digit numbers.
   */
  Test.Expect<
    $<
      $<
        NaturalNumber.Multiply,
        123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789n
      >,
      123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789n
    >,
    15241578780673678546105778311537878076969977842402077607834177373266277138698376904130476639079418873647319108215219342783119577351019811918920046486820281054720515622620750190521n
  >
];
