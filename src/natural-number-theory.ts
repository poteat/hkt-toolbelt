export * from './natural-number-theory/'

/**
 * The `NaturalNumberTheory` module contains various novelty utilities for
 * computing natural number sequences and operations. It provides utilities such
 * as collatz, factorial, etc.
 *
 * @example
 * ```ts
 * import { $, NaturalNumberTheory } from 'hkt-toolbelt'
 *
 * type Result = $<NaturalNumberTheory.Factorial, 5> // 120
 * ```
 */
declare module './natural-number-theory' {}
