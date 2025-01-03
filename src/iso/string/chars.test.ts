import { $, Iso, String, Test, List } from '../..'

type Chars_Spec = [
  /**
   * Can repeat each character of a string by two.
   */
  Test.Expect<
    $<$<Iso.String.Chars, $<List.Map, $<String.RepeatBy, 2>>>, 'bar'>,
    'bbaarr'
  >
]

it('should repeat each character of a string by two', () => {
  expect(Iso.String.chars(List.map(String.repeatBy(2)))('bar')).toBe('bbaarr')
})
