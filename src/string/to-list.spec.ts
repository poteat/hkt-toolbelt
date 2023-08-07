import { $, Test, String } from '..'

type ToList_Spec = [
  /**
   * "abc" => ["a", "b", "c"]
   */
  Test.Expect<$<String.ToList, 'abc'>, ['a', 'b', 'c']>,

  /**
   * "" => []
   */
  Test.Expect<$<String.ToList, ''>, []>,

  /**
   * "a" => ["a"]
   */
  Test.Expect<$<String.ToList, 'a'>, ['a']>,

  /**
   * "ab" => ["a", "b"]
   */
  Test.Expect<$<String.ToList, 'ab'>, ['a', 'b']>,

  /**
   * Can split 10 elements.
   */
  Test.Expect<$<String.ToList, TenString>, Ten>,

  /**
   * Can split 100 elements.
   */
  Test.Expect<$<String.ToList, HundredString>, Hundred>,

  /**
   * Can split 1000 elements.
   */
  Test.Expect<$<String.ToList, ThousandString>, Thousand>,

  /**
   * Can split 2000 elements.
   */
  Test.Expect<
    $<String.ToList, `${ThousandString}${ThousandString}`>,
    [...Thousand, ...Thousand]
  >,

  /**
   * Can split 3000 elements.
   */
  Test.Expect<
    $<String.ToList, `${ThousandString}${ThousandString}${ThousandString}`>,
    [...Thousand, ...Thousand, ...Thousand]
  >,

  /**
   * Can split 4000 elements.
   */
  Test.Expect<
    $<
      String.ToList,
      `${ThousandString}${ThousandString}${ThousandString}${ThousandString}`
    >,
    [...Thousand, ...Thousand, ...Thousand, ...Thousand]
  >,

  /**
   * Can split 5000 elements.
   */
  Test.Expect<
    $<
      String.ToList,
      `${ThousandString}${ThousandString}${ThousandString}${ThousandString}${ThousandString}`
    >,
    [...Thousand, ...Thousand, ...Thousand, ...Thousand, ...Thousand]
  >
]

type Ten = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', ' ']

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
]

type Thousand = [
  ...Hundred,
  ...Hundred,
  ...Hundred,
  ...Hundred,
  ...Hundred,
  ...Hundred,
  ...Hundred,
  ...Hundred,
  ...Hundred,
  ...Hundred
]

type TenString = 'abcdefghi '

type HundredString =
  `${TenString}${TenString}${TenString}${TenString}${TenString}${TenString}${TenString}${TenString}${TenString}${TenString}`

type ThousandString =
  `${HundredString}${HundredString}${HundredString}${HundredString}${HundredString}${HundredString}${HundredString}${HundredString}${HundredString}${HundredString}`
