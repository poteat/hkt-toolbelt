import { $, Matrix, Test } from '..'

type Chunk_Spec = [
  /**
   * Can chunk a matrix into chunks of a specified size, where each resultant
   * matrix has one row and two columns.
   */
  Test.Expect<
    $<
      $<$<Matrix.Chunk, 1>, 2>,
      [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]
    >,
    [
      [[1, 2]],
      [[3, 4]],
      [[5, 6]],
      [[7, 8]],
      [[9, 10]],
      [[11, 12]],
      [[13, 14]],
      [[15, 16]]
    ]
  >,

  /**
   * Chunking an empty matrix results in an empty array.
   */
  Test.Expect<$<$<$<Matrix.Chunk, 1>, 1>, []>, []>,

  /**
   * Chunking by 1x1 results in each element in its own matrix.
   */
  Test.Expect<
    $<$<$<Matrix.Chunk, 1>, 1>, [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]>,
    [[[1]], [[2]], [[3]], [[4]], [[5]], [[6]], [[7]], [[8]], [[9]], [[10]]]
  >,

  /**
   * Chunking by 0x0 results in a 1-tuple containing the original matrix.
   */
  Test.Expect<
    $<$<$<Matrix.Chunk, 0>, 0>, [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]>,
    [[[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]]
  >
]
