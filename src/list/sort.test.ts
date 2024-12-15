import {
  $,
  Test,
  List,
  String,
  Function,
  Kind,
  NaturalNumber,
  Integer
} from '..'

type Sort_Spec = [
  /**
   * Can sort a list of numbers.
   */
  Test.Expect<
    $<$<List.Sort, Function.Identity>, [5, 4, 6, 3, 7, 2, 8, 1, 9, 10]>,
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  >,

  /**
   * Can sort a list of strings by length.
   */
  Test.Expect<
    $<$<List.Sort, String.Length>, ['foo', 'bar', 'baz', 'x', 'qux', 'quux']>,
    ['x', 'foo', 'bar', 'baz', 'qux', 'quux']
  >,

  /**
   * Can sort an empty list.
   */
  Test.Expect<$<$<List.Sort, Function.Identity>, []>, []>,

  /**
   * Can sort 2d lists.
   */
  Test.Expect<
    $<$<List.Sort, List.Compare>, [['foo', 'bar'], ['baz', 'qux']]>,
    [['baz', 'qux'], ['foo', 'bar']]
  >
]

it('should sort a list of numbers', () => {
  expect(List.sort(Function.identity)([5, 4, 6, 3, 7, 2, 8, 1, 9, 10])).toEqual(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  )
})

it('should sort a list of strings by length', () => {
  expect(
    List.sort(String.length)(['foo', 'bar', 'baz', 'x', 'qux', 'quux'])
  ).toEqual(['x', 'foo', 'bar', 'baz', 'qux', 'quux'])
})

it('should sort an empty list', () => {
  expect(List.sort(Function.identity)([])).toEqual([])
})

it('can sort complicated functions on lists', () => {
  /**
   * Sort descending by number, then ascending by string.
   */
  const mySort = List.sort(
    List.compareBy([
      Kind.lazyPipe([NaturalNumber.compare, Integer.negate]),
      String.compare
    ])
  )

  const result = mySort([
    [1, 'foo'],
    [2, 'bar'],
    [3, 'baz'],
    [1, 'qux'],
    [3, 'abc']
  ])

  expect(result).toEqual([
    [3, 'abc'],
    [3, 'baz'],
    [2, 'bar'],
    [1, 'foo'],
    [1, 'qux']
  ])
})
