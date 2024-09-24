import { $, Matrix, Test } from '..'

type Combine_Spec = [
  /**
   * Can combine a matrix of matrices.
   */
  Test.Expect<
    $<Matrix.Combine, [[[1, 2], [5, 6]], [[9, 10], [13, 14]]]>,
    [[1, 9], [2, 10], [5, 13], [6, 14]]
  >,

  /**
   * Can combine a matrix of matrices.
   */
  Test.Expect<
    $<Matrix.Combine, [[[3, 4], [7, 8]], [[11, 12], [15, 16]]]>,
    [[3, 11], [4, 12], [7, 15], [8, 16]]
  >
]
