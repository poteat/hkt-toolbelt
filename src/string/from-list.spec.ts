import { $, Test, String } from "..";

type FromList_Spec = [
  /**
   * [a, b, c] => abc
   */
  Test.Expect<$<String.FromList, ["a", "b", "c"]>, "abc">,

  /**
   * [] => ""
   */
  Test.Expect<$<String.FromList, []>, "">,

  /**
   * "foo", "bar" => foobar
   */
  Test.Expect<$<String.FromList, ["foo", "bar"]>, "foobar">,

  /**
   * Can join 10 elements.
   */
  Test.Expect<$<String.FromList, Ten>, TenString>,

  /**
   * Can join 100 elements.
   */
  Test.Expect<$<String.FromList, Hundred>, HundredString>,

  /**
   * Can join 1000 elements.
   */
  Test.Expect<$<String.FromList, Thousand>, ThousandString>
];

type Ten = ["a", "b", "c", "d", "e", "f", "g", "h", "i", " "];

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
];

type TenString = "abcdefghi ";

type HundredString =
  `${TenString}${TenString}${TenString}${TenString}${TenString}${TenString}${TenString}${TenString}${TenString}${TenString}`;

type ThousandString =
  `${HundredString}${HundredString}${HundredString}${HundredString}${HundredString}${HundredString}${HundredString}${HundredString}${HundredString}${HundredString}`;

type X = $<String.FromList, Hundred>;
