import { $, Test, Object, String, Function } from '..'

type PickByValue_Spec = [
  /**
   * Can pick a key from an object based on a value.
   */
  Test.Expect<
    $<
      $<Object.PickByValue, $<String.StartsWith, 'f'>>,
      { foo: 'foo'; bar: 'faz'; quux: 'corge' }
    >,
    { foo: 'foo'; bar: 'faz' }
  >,

  /**
   * Picking by true returns the object unchanged.
   */
  Test.Expect<
    $<
      $<Object.PickByValue, $<Function.Constant, true>>,
      { foo: 'foo'; bar: 'faz'; quux: 'corge' }
    >,
    { foo: 'foo'; bar: 'faz'; quux: 'corge' }
  >,

  /**
   * Picking by false returns an empty object.
   */
  Test.Expect<
    $<
      $<Object.PickByValue, $<Function.Constant, false>>,
      { foo: 'foo'; bar: 'faz'; quux: 'corge' }
    >,
    {}
  >
]

it('should pick a key from an object based on a value', () => {
  expect(
    Object.pickByValue(String.startsWith('f'))({
      foo: 'foo',
      bar: 'faz',
      quux: 'corge'
    })
  ).toEqual({ foo: 'foo', bar: 'faz' })
})
