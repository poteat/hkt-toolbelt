import { $, List, Test } from '..'

type PushValue_Spec = [
  /**
   * Can push a value to the end of a tuple.
   */
  Test.Expect<$<$<List.PushValue, [1, 2, 3]>, 4>, [1, 2, 3, 4]>,

  /**
   * Pushing to an empty tuple results in a tuple with just the pushed element.
   */
  Test.Expect<$<$<List.PushValue, []>, 'foo'>, ['foo']>,

  /**
   * Pushing to a tuple with a rest parameter results in a tuple with the
   * pushed element.
   */
  Test.Expect<
    $<$<List.PushValue, [1, 2, ...string[]]>, 'foo'>,
    [1, 2, ...string[], 'foo']
  >
]

it('should push a value onto the end of a list', () => {
  expect(List.pushValue([1, 2, 3])(4)).toEqual([1, 2, 3, 4])
})
