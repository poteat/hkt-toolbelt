import { $, Test, Type } from '..'

type TypeOf_Spec = [
  // Primitives
  Test.Expect<$<Type.TypeOf, string>, 'string'>,
  Test.Expect<$<Type.TypeOf, number>, 'number'>,
  Test.Expect<$<Type.TypeOf, boolean>, 'boolean'>,
  Test.Expect<$<Type.TypeOf, symbol>, 'symbol'>,
  Test.Expect<$<Type.TypeOf, bigint>, 'bigint'>,
  Test.Expect<$<Type.TypeOf, undefined>, 'undefined'>,

  // null is considered object at runtime
  Test.Expect<$<Type.TypeOf, null>, 'object'>,

  // Objects
  Test.Expect<$<Type.TypeOf, {}>, 'object'>,
  Test.Expect<$<Type.TypeOf, { a: 1 }>, 'object'>,
  Test.Expect<$<Type.TypeOf, []>, 'object'>,

  // Functions
  Test.Expect<$<Type.TypeOf, () => void>, 'function'>
]

describe('typeOf', () => {
  it('should return "string" for strings', () => {
    expect(Type.typeOf('hello')).toBe('string')
  })

  it('should return "number" for numbers', () => {
    expect(Type.typeOf(123)).toBe('number')
  })

  it('should return "boolean" for booleans', () => {
    expect(Type.typeOf(true)).toBe('boolean')
    expect(Type.typeOf(false)).toBe('boolean')
  })

  it('should return "symbol" for symbols', () => {
    expect(Type.typeOf(Symbol())).toBe('symbol')
  })

  it('should return "bigint" for bigints', () => {
    expect(Type.typeOf(BigInt(10))).toBe('bigint')
  })

  it('should return "undefined" for undefined', () => {
    expect(Type.typeOf(undefined)).toBe('undefined')
  })

  it('should return "object" for null', () => {
    expect(Type.typeOf(null)).toBe('object')
  })

  it('should return "object" for objects and arrays', () => {
    expect(Type.typeOf({})).toBe('object')
    expect(Type.typeOf({ a: 1 })).toBe('object')
    expect(Type.typeOf([])).toBe('object')
  })

  it('should return "function" for functions', () => {
    expect(Type.typeOf(() => {})).toBe('function')
  })
})
