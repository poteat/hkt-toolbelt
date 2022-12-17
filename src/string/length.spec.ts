import { $, String, Test } from "..";

type Length_Spec = [
  /**
   * Can get the length of a string.
   */
  Test.Expect<$<String.Length, "foo">, 3>,

  /**
   * The length of an empty string is 0.
   */
  Test.Expect<$<String.Length, "">, 0>,

  /**
   * The length of a string is 'number'.
   */
  Test.Expect<$<String.Length, string>, number>,

  /**
   * A variadic string is of length `number`.
   */
  Test.Expect<$<String.Length, `foo${string}`>, number>,

  /**
   * Can get the length of 1000 characters.
   */
  Test.Expect<$<String.Length, Thousand>, 1000>
];

type Ten = `abcdefghij`;

type Hundred = `${Ten}${Ten}${Ten}${Ten}${Ten}${Ten}${Ten}${Ten}${Ten}${Ten}`;

type Thousand =
  `${Hundred}${Hundred}${Hundred}${Hundred}${Hundred}${Hundred}${Hundred}${Hundred}${Hundred}${Hundred}`;
