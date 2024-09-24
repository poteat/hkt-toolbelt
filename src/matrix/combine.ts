import { $, Kind, List, Matrix } from '..'

/**
 * `Combine` is a type-level function that takes in a matrix-of-matrices `T`,
 * and concatenates the matrices into a single matrix. All inner matrices must
 * have the same dimensions (excluding the outer dimension).
 *
 * @template T - The matrix-of-matrices to concatenate.
 *
 * @example
 * type T0 = $<Matrix.Combine<
 *   [
 *     [
 *       [1, 2], // M1
 *       [3, 4],
 *     ],
 *     [
 *       [5, 6], // M3
 *       [7, 8],
 *     ]
 *   ],
 *   [
 *     [
 *       ["a", "b"], // M2
 *       ["c", "d"],
 *     ],
 *     [
 *       ["e", "f"], // M4
 *       ["g", "h"],
 *     ]
 *   ]
 * > // [[[1, 2, "a", "b"], [5, 6, "e", "f"]], [[3, 4, "c", "d"], [7, 8, "g", "h"]]]
 * // or [[M1, M2], [M3, M4]]
 */
export type Combine = $<
  Kind.Pipe,
  [
    Matrix.Columns,
    $<
      List.FlatMap,
      $<
        Kind.PipeWeak,
        [
          List.Repeat,
          $<Kind.Apply, 2>,
          $<
            Kind.Uncurry,
            $<
              Kind.PipeWeak,
              [
                Kind.Apply,
                $<List.PushValue, [List.At, List.FlatMap]>,
                Kind.PipeWeak,
                List.Map,
                $<List.PushValue, [List.First, List.Length, List.Times]>,
                Kind.PipeWeak
              ]
            >
          >
        ]
      >
    >
  ]
>
