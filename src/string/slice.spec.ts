import { $, Test, String } from '..';

type Slice_Spec = [
  /**
   * "abc", 1 => bc
   */
  Test.Expect<$<$<String.Slice, 1>, 'abc'>, 'bc'>,

  /**
   * "abc", 0 => abc
   */
  Test.Expect<$<$<String.Slice, 0>, 'abc'>, 'abc'>,

  /**
   * "", 0 => ""
   */
  Test.Expect<$<$<String.Slice, 0>, ''>, ''>,

  /**
   * "", 1 => ""
   */
  Test.Expect<$<$<String.Slice, 1>, ''>, ''>,

  /**
   * "a", 1 => ""
   */
  Test.Expect<$<$<String.Slice, 1>, 'a'>, ''>,

  /**
   * "abc", 2 => c
   */
  Test.Expect<$<$<String.Slice, 2>, 'abc'>, 'c'>,

  /**
   * Non-integral slices are not allowed.
   */
  Test.Expect<$<$<String.Slice, 1.5>, 'abc'>, never>,

  /**
   * Negative slices are not allowed.
   */
  Test.Expect<$<$<String.Slice, -1>, 'abc'>, never>,

  /**
   * Can slice large strings.
   */
  Test.Expect<
    $<
      $<String.Slice, 90>,
      'abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi '
    >,
    'abcdefghi '
  >,

  /**
   * Can slice 10 characters.
   */
  Test.Expect<$<$<String.Slice, 10>, Ten>, ''>,

  /**
   * Can slice 100 characters.
   */
  Test.Expect<$<$<String.Slice, 100>, Hundred>, ''>,

  /**
   * Can slice 1000 characters.
   */
  Test.Expect<$<$<String.Slice, 1000>, Thousand>, ''>,

  /**
   * Can slice 2000 characters.
   */
  Test.Expect<$<$<String.Slice, 2000>, `${Thousand}${Thousand}`>, ''>
];

type Ten = 'abcdefghij';

type Hundred = `${Ten}${Ten}${Ten}${Ten}${Ten}${Ten}${Ten}${Ten}${Ten}${Ten}`;

type Thousand =
  `${Hundred}${Hundred}${Hundred}${Hundred}${Hundred}${Hundred}${Hundred}${Hundred}${Hundred}${Hundred}`;
