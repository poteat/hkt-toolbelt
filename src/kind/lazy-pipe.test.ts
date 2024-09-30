import { $, Combinator, Kind, List, String, Test } from '..'

type LazyPipe_Spec = [
  /**
   * Can pipe simple operations.
   */
  Test.Expect<
    $<
      $<Kind.LazyPipe, [$<String.Append, 'bar'>, $<String.Append, 'foo'>]>,
      'baz'
    >,
    'bazbarfoo'
  >,

  /**
   * Can pipe operations of differing arity.
   */
  Test.Expect<
    $<
      $<
        $<Kind.LazyPipe, [$<Combinator.Collate, 2>, List.Flatten, List.Length]>,
        [1, 2, 3]
      >,
      [4, 5, 6]
    >,
    6
  >
]

it('should apply a list of kinds to a value', () => {
  expect(Kind.lazyPipe([List.reverse])([1, 2, 3])).toEqual([3, 2, 1])
})

it('should be able to handle collation', () => {
  expect(
    Kind.lazyPipe([Combinator.collate(2), List.flatten, List.length])([
      1, 2, 3
    ])([4, 5, 6])
  ).toEqual(6)
})
