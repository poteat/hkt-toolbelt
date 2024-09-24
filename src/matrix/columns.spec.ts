import { $, Matrix, Test } from '..'

type Columns_Spec = [
  /**
   * Can get the columns of a matrix.
   */
  Test.Expect<
    $<Matrix.Columns, [[1, 2, 3], [4, 5, 6]]>,
    [[1, 4], [2, 5], [3, 6]]
  >,

  /**
   * Can get the columns of a matrix with a single column.
   */
  Test.Expect<$<Matrix.Columns, [[1], [2], [3]]>, [[1, 2, 3]]>,

  /**
   * Can get the columns of a matrix with a single row.
   */
  Test.Expect<$<Matrix.Columns, [[1, 2, 3]]>, [[1], [2], [3]]>
]
