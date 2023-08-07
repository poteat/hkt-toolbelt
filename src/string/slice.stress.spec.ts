import { $, Test, String, Stress } from '..';

type Slice_Spec = [
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
  Test.Expect<$<$<String.Slice, 10>, Stress.TenString>, ''>,

  /**
   * Can slice 100 characters.
   */
  Test.Expect<$<$<String.Slice, 100>, Stress.HundredString>, ''>,

  /**
   * Can slice 1000 characters.
   */
  Test.Expect<$<$<String.Slice, 1000>, Stress.ThousandString>, ''>,

  /**
   * Can slice 2000 characters.
   */
  Test.Expect<
    $<
      $<String.Slice, 2000>,
      `${Stress.ThousandString}${Stress.ThousandString}`
    >,
    ''
  >
];
