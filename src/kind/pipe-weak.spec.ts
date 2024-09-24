import { $, Kind, String, Test } from '..'

type PipeWeak_Spec = [
  /**
   * Can pipe simple operations.
   */
  Test.Expect<
    $<
      $<Kind.PipeWeak, [$<String.Append, 'foo'>, $<String.Append, 'bar'>]>,
      'baz'
    >,
    'bazfoobar'
  >
]
