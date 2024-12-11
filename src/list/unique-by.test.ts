import { $, Test, List, String, NaturalNumber, Type } from '..'

type UniqueBy_Spec = [
  /**
   * Empty list should result in an empty list.
   */
  Test.Expect<$<$<List.UniqueBy, String.Length>, []>, []>,

  /**
   * No duplicates when keys are distinct.
   */
  Test.Expect<
    $<$<List.UniqueBy, String.Length>, ['a', 'bb', 'ccc']>,
    ['a', 'bb', 'ccc']
  >,

  /**
   * Removes duplicates based on mapped keys (string length).
   * 'a' -> 1, 'bb' -> 2, 'c' -> 1, 'ddd' -> 3
   * The second '1' key means 'c' is removed.
   */
  Test.Expect<
    $<$<List.UniqueBy, String.Length>, ['a', 'bb', 'c', 'ddd']>,
    ['a', 'bb', 'ddd']
  >,

  /**
   * Works with number mapping. Example: map each number to its modulo 2 result.
   * Mapping kind: a custom number kind that returns `N % 2`.
   */
  Test.Expect<
    $<$<List.UniqueBy, $<NaturalNumber.ModuloBy, 2>>, [1, 2, 3, 4, 5, 6]>,
    [1, 2] // 1 % 2 = 1, 2 % 2 = 0, 3 % 2 = 1 (duplicate key), 4 % 2 = 0 (duplicate), etc.
  >,

  /**
   * Ensures stable uniqueness with mixed input:
   * Using String.Length as key again.
   */
  Test.Expect<
    $<$<List.UniqueBy, String.Length>, ['x', 'xx', 'xx', 'xxx', 'xx']>,
    ['x', 'xx', 'xxx']
  >
]

describe('List.uniqueBy', () => {
  it('returns an empty list when given an empty list', () => {
    const byLength = (x: string) => x.length
    expect(List.uniqueBy(String.length)([])).toEqual([])
  })

  it('no duplicates if keys are distinct', () => {
    const byLength = (x: string) => x.length
    expect(List.uniqueBy(String.length)(['a', 'bb', 'ccc'])).toEqual([
      'a',
      'bb',
      'ccc'
    ])
  })

  it('removes duplicates based on mapped keys (string length)', () => {
    const byLength = (x: string) => x.length
    // 'a' -> 1, 'bb' -> 2, 'c' -> 1 (duplicate), 'ddd' -> 3
    expect(List.uniqueBy(String.length)(['a', 'bb', 'c', 'ddd'])).toEqual([
      'a',
      'bb',
      'ddd'
    ])
  })

  it('works with numeric mapping (e.g., mod 2)', () => {
    const mod2 = (x: number) => x % 2
    // Keys: 1 -> 1, 2 -> 0, 3 -> 1 (duplicate), 4 -> 0 (duplicate), 5 -> 1 (duplicate), 6 -> 0 (duplicate)
    expect(
      List.uniqueBy(NaturalNumber.moduloBy(2))([1, 2, 3, 4, 5, 6])
    ).toEqual([1, 2])
  })

  it('handles mixed inputs (and fallback to stable hashing)', () => {
    // Keys: [1, 'a', true, {}]
    // Mapping by `typeof`: number -> 'number', string -> 'string', boolean -> 'boolean', object -> 'object'
    expect(
      List.uniqueBy(Type.typeOf)([
        1,
        'a',
        3,
        true,
        false,
        { x: 1 },
        { y: 2 },
        'b'
      ])
    ).toEqual([1, 'a', true, { x: 1 }])
  })
})
