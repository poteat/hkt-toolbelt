import { Test } from '..'
import { $ } from '../$'
import { Clamp } from './clamp'

/**
 * A value above the upper bound is clamped down to it.
 */
type Test1 = Test.Expect<$<$<$<Clamp, 0>, 10>, 15>, 10>

/**
 * A value below the lower bound is clamped up to it.
 */
type Test2 = Test.Expect<$<$<$<Clamp, 0>, 10>, -3>, 0>

/**
 * A value already within the bounds is returned unchanged.
 */
type Test3 = Test.Expect<$<$<$<Clamp, 0>, 10>, 7>, 7>

/**
 * A value equal to a bound is returned unchanged.
 */
type Test4 = Test.Expect<$<$<$<Clamp, 0>, 10>, 10>, 10>

/**
 * Can clamp within a range of negative numbers.
 */
type Test5 = Test.Expect<$<$<$<Clamp, -10>, -5>, -1>, -5>

/**
 * Can clamp a negative number up to a zero lower bound.
 */
type Test6 = Test.Expect<$<$<$<Clamp, 0>, 5>, -2>, 0>
