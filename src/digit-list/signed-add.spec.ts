import { Test, DigitList } from '..'

type SignedAdd_Spec = [
  /**
   * Can add two positive numbers.
   */
  Test.Expect<
    DigitList._$signedAdd<['1', '2', '3'], ['4', '5', '6'], '+', '+'>,
    ['+', ['5', '7', '9']]
  >,

  /**
   * Can add two negative numbers.
   */
  Test.Expect<
    DigitList._$signedAdd<['1', '2', '3'], ['4', '5', '6'], '-', '-'>,
    ['-', ['5', '7', '9']]
  >,

  /**
   * Can add a positive and a negative number where positive is larger.
   */
  Test.Expect<
    DigitList._$signedAdd<['4', '5', '6'], ['1', '2', '3'], '+', '-'>,
    ['+', ['3', '3', '3']]
  >,

  /**
   * Can add a positive and a negative number where negative is larger.
   */
  Test.Expect<
    DigitList._$signedAdd<['1', '2', '3'], ['4', '5', '6'], '+', '-'>,
    ['-', ['3', '3', '3']]
  >,

  /**
   * Can add zero to a positive number.
   */
  Test.Expect<
    DigitList._$signedAdd<[], ['4', '5', '6'], '+', '+'>,
    ['+', ['4', '5', '6']]
  >,

  /**
   * Can add zero to a negative number.
   */
  Test.Expect<
    DigitList._$signedAdd<[], ['4', '5', '6'], '-', '-'>,
    ['-', ['4', '5', '6']]
  >,

  /**
   * Adding a number to itself but with opposite signs results in zero.
   */
  Test.Expect<
    DigitList._$signedAdd<['1', '2', '3'], ['1', '2', '3'], '+', '-'>,
    ['+', ['0']]
  >,

  /**
   * Can add large numbers with different signs, positive larger.
   */
  Test.Expect<
    DigitList._$signedAdd<['9', '9', '9', '9'], ['8', '8', '8'], '+', '-'>,
    ['+', ['9', '1', '1', '1']]
  >,

  /**
   * Can add large numbers with different signs, negative larger.
   */
  Test.Expect<
    DigitList._$signedAdd<['8', '8', '8'], ['9', '9', '9', '9'], '+', '-'>,
    ['-', ['9', '1', '1', '1']]
  >,

  /**
   * Adding two empty lists.
   */
  Test.Expect<DigitList._$signedAdd<[], [], '+', '+'>, ['+', ['0']]>
]
