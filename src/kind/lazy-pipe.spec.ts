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
