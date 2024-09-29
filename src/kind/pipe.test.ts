import { $, Function, Kind, List, NaturalNumber, String, Test } from '..'

type Pipe_Spec = [
  /**
   * Can pipe simple operations.
   */
  Test.Expect<
    $<$<Kind.Pipe, [$<List.Push, 'bar'>, $<List.Unshift, 'foo'>]>, [1, 2, 3]>,
    ['foo', 1, 2, 3, 'bar']
  >,

  /**
   * Pipe of non-kinds emits an error.
   */
  // @ts-expect-error
  Kind.Pipe<[number, string]>,

  /**
   * Pipe of an empty tuple of kinds is equal to the identity function.
   */
  Test.Expect<$<Kind.Pipe, []>, Function.Identity>,

  /**
   * Pipe occurs from left-to-right.
   */
  Test.Expect<
    $<$<Kind.Pipe, [$<List.Push, 'bar'>, $<List.Push, 'foo'>]>, [1, 2, 3]>,
    [1, 2, 3, 'bar', 'foo']
  >,

  /**
   * Passing in a data type which is not a valid parameter of the pipe results
   * in a type error.
   */
  // @ts-expect-error
  $<Kind.Pipe<[$<List.Push, 'bar'>]>, number>,

  /**
   * Incompatible kinds in the pipe emit a type error. That is, the output of
   * kind $N$ must be a subtype of the input of kind $N+1$.
   */
  // @ts-expect-error
  $<Kind.Pipe<[$<List.Push, 'bar'>, String.StartsWith<'foo'>]>, []>,

  /**
   * String operations may be piped.
   */
  Test.Expect<
    $<
      $<Kind.Pipe, [$<String.Append, 'bar'>, $<String.EndsWith, 'bar'>]>,
      'foobar'
    >
  >,

  /**
   * Can pipe unions of hk-types.
   */
  Test.Expect<
    $<
      $<
        Kind.Pipe,
        [$<List.Push, 'foo'> | $<List.Push, 'qux'>, $<List.Push, 'bar'>]
      >,
      []
    >,
    ['foo' | 'qux', 'bar']
  >,

  /**
   * Can pipe ten operations without hitting the depth limit.
   */
  Test.Expect<
    $<
      $<
        Kind.Pipe,
        [
          $<List.Push, 1>,
          $<List.Push, 2>,
          $<List.Push, 3>,
          $<List.Push, 4>,
          $<List.Push, 5>,
          $<List.Push, 6>,
          $<List.Push, 7>,
          $<List.Push, 8>,
          $<List.Push, 9>,
          $<List.Push, 10>
        ]
      >,
      []
    >,
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  >
]

it('should pipe functions together', () => {
  const result = Kind.pipe([NaturalNumber.increment, NaturalNumber.increment])(
    0
  )

  expect(result).toBe(2)
})
