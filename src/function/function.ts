/**
 * `Function` is the top type (supertype) of all function types in TypeScript.
 *
 * It specifies `never[]` as the parameter types because:
 *
 * 1. Parameters are contravariant, so for a function A to be assignable to B,
 *    the parameters of B must be assignable to the parameters of A.
 *
 * 2. We want every other function to be assignable to `Function`, i.e. be a
 *    subtype of Function.
 *
 * 3. `never` is the only type assignable to all other types. It is the bottom
 *    type (subtype) of all types.
 *
 * So by using `never[]` parameters, `Function` becomes assignable from any
 * other function type, making it the top type.
 */
export type Function = (...x: never[]) => unknown
