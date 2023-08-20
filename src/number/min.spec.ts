import { Test } from '..'
import { $ } from '../$'
import { Min } from './min'

/**
 * Can get the minimum of two positive numbers.
 */
type Test1 = Test.Expect<$<$<Min, 1>, 2>, 1>

/**
 * Can get the minimum of two negative numbers.
 */
type Test2 = Test.Expect<$<$<Min, -1>, -2>, -2>

/**
 * Can get the minimum of a positive number and zero.
 */
type Test3 = Test.Expect<$<$<Min, 0>, 1>, 0>

/**
 * Can get the minimum of a negative number and zero.
 */
type Test4 = Test.Expect<$<$<Min, 0>, -1>, -1>

export type Min_Spec = [Test1, Test2, Test3, Test4]
