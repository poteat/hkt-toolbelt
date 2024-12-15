import { $, List, Test } from '..'

type CartesianProduct_Spec = [
  // Single element, single value
  Test.Expect<$<List.CartesianProduct, ['foo']>, [['foo']]>,

  // Two elements, both single values
  Test.Expect<$<List.CartesianProduct, ['foo', 'bar']>, [['foo', 'bar']]>,

  // Mix single and tuple
  Test.Expect<
    $<List.CartesianProduct, ['foo', ['bar', 'qux']]>,
    [['foo', 'bar'], ['foo', 'qux']]
  >,

  // Multiple tuples
  Test.Expect<
    $<List.CartesianProduct, [['a', 'b'], ['c', 'd']]>,
    [['a', 'c'], ['a', 'd'], ['b', 'c'], ['b', 'd']]
  >,

  // More complex example
  Test.Expect<
    $<List.CartesianProduct, [['x'], ['y', 'z'], [1, 2]]>,
    [['x', 'y', 1], ['x', 'y', 2], ['x', 'z', 1], ['x', 'z', 2]]
  >
]

describe('List.cartesianProduct (runtime)', () => {
  it('returns [[]] for an empty input', () => {
    expect(List.cartesianProduct([])).toEqual([[]])
  })

  it('handles a single element that is not an array', () => {
    expect(List.cartesianProduct(['foo'])).toEqual([['foo']])
  })

  it('handles multiple single-value elements', () => {
    // ["foo", "bar"] -> [["foo","bar"]]
    expect(List.cartesianProduct(['foo', 'bar'])).toEqual([['foo', 'bar']])
  })

  it('handles a mix of single values and arrays', () => {
    // ["foo", ["bar","qux"]]
    // Expect: [["foo","bar"],["foo","qux"]]
    const result = List.cartesianProduct(['foo', ['bar', 'qux']])
    expect(result).toEqual([
      ['foo', 'bar'],
      ['foo', 'qux']
    ])
  })

  it('handles multiple arrays', () => {
    // [["a","b"], ["c","d"]]
    // Expect: [["a","c"],["a","d"],["b","c"],["b","d"]]
    const result = List.cartesianProduct([
      ['a', 'b'],
      ['c', 'd']
    ])
    expect(result).toEqual([
      ['a', 'c'],
      ['a', 'd'],
      ['b', 'c'],
      ['b', 'd']
    ])
  })

  it('handles more complex examples', () => {
    // [["x"], ["y","z"], [1,2]]
    // Expect: [
    //   ["x","y",1],
    //   ["x","y",2],
    //   ["x","z",1],
    //   ["x","z",2]
    // ]
    const result = List.cartesianProduct([['x'], ['y', 'z'], [1, 2]])
    expect(result).toEqual([
      ['x', 'y', 1],
      ['x', 'y', 2],
      ['x', 'z', 1],
      ['x', 'z', 2]
    ])
  })

  it('maintains order correctly', () => {
    // Order verification:
    // For [["a","b"], ["c","d"]], we specifically want [["a","c"],["a","d"],["b","c"],["b","d"]]
    const result = List.cartesianProduct([
      ['a', 'b'],
      ['c', 'd']
    ])
    expect(result).toEqual([
      ['a', 'c'],
      ['a', 'd'],
      ['b', 'c'],
      ['b', 'd']
    ])
  })
})
