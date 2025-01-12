import { $, Test, Iso, String, List } from '../..'

type Words_Spec = [
  /**
   * Can reverse each word in a string.
   */
  Test.Expect<
    $<$<Iso.String.Words, $<List.Map, String.Reverse>>, 'hello world'>,
    'olleh dlrow'
  >,

  /**
   * Can capitalize each word in a string.
   */
  Test.Expect<
    $<$<Iso.String.Words, $<List.Map, String.Capitalize>>, 'hello world'>,
    'Hello World'
  >
]

it('should reverse each word in a string', () => {
  expect(Iso.String.words(List.map(String.reverse))('hello world')).toBe(
    'olleh dlrow'
  )
})

it('should capitalize each word in a string', () => {
  expect(Iso.String.words(List.map(String.capitalize))('hello world')).toBe(
    'Hello World'
  )
})
