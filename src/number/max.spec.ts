import { Test } from '..'
import { $ } from '../$'
import { Max } from './max'

/**
 * Can get the maximum of two positive numbers.
 */
type Test1 = Test.Expect<$<$<Max, 1>, 2>, 2>

/**
 * Can get the maximum of two negative numbers.
 */
type Test2 = Test.Expect<$<$<Max, -1>, -2>, -1>

/**
 * Can get the maximum of a positive number and zero.
 */
type Test3 = Test.Expect<$<$<Max, 0>, 1>, 1>

/**
 * Can get the maximum of a negative number and zero.
 */
type Test4 = Test.Expect<$<$<Max, 0>, -1>, 0>

