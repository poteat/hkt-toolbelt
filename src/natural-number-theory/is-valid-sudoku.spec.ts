import { $, NaturalNumberTheory, Test } from '..'

type ValidSudoku_Spec = [
  /**
   * A valid Sudoku puzzle
   */
  Test.Expect<
    $<
      NaturalNumberTheory.IsValidSudoku,
      [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 0, 5, 0, 7, 0, 0],
        [0, 1, 3, 9, 2, 4, 0, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 0],
        [2, 8, 0, 4, 1, 9, 6, 3, 5],
        [3, 0, 0, 2, 8, 6, 1, 7, 9]
      ]
    >
  >,

  /**
   * An invalid Sudoku puzzle, based on size.
   */
  Test.Expect<
    $<NaturalNumberTheory.IsValidSudoku, [[1, 2, 3], [4, 5, 6]]>,
    false
  >,

  /**
   * A Sudoku puzzle of all zeroes is valid.
   */
  Test.Expect<
    $<
      NaturalNumberTheory.IsValidSudoku,
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
    >,
    true
  >,

  /**
   * An invalid Sudoku puzzle, based on row duplication.
   */
  Test.Expect<
    $<
      NaturalNumberTheory.IsValidSudoku,
      [
        [1, 0, 0, 0, 0, 0, 0, 0, 1], // Row with duplicate values 1
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
    >,
    false
  >,

  /**
   * An invalid Sudoku puzzle, based on column duplication.
   */
  Test.Expect<
    $<
      NaturalNumberTheory.IsValidSudoku,
      [
        [1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
    >,
    false
  >,

  /**
   * An invalid Sudoku puzzle, based on box duplication.
   */
  Test.Expect<
    $<
      NaturalNumberTheory.IsValidSudoku,
      [
        [1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
    >,
    false
  >
]
