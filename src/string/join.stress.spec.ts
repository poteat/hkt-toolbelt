import { $, String, Test } from '..';

type Join_Spec = [
  /**
   * Can join large tuples.
   */
  Test.Expect<
    $<
      $<String.Join, ''>,
      [
        'foo',
        'bar',
        'baz',
        'qux',
        'quux',
        'corge',
        'grault',
        'garply',
        'waldo',
        'fred',
        'plugh',
        'xyzzy',
        'thud'
      ]
    >,
    'foobarbazquxquuxcorgegraultgarplywaldofredplughxyzzythud'
  >
];
