import { $, Function, Test } from '..'

type Constant_Spec = [
  /**
   * Returns the type of the configured constant, when applied to any type.
   */
  Test.Expect<$<$<Function.Constant, 'foo'>, 0>, 'foo'>
]

it('should return the configured constant value', () => {
  expect(Function.constant('foo')('ignored')).toBe('foo')
})
