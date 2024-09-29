import { $, Conditional, Function, Kind, List, Matrix, Type } from '..'

// Given a predicate F and a value X, return F(X) ? never : X
type NeverIf = $<
  Kind.Pipe,
  [
    Conditional.If,
    $<Kind.ApplyN, [$<Function.Constant, never>, Function.Identity]>
  ]
>

// Given a tuple T and a value X, return T.contains(X) ? never : X
type NeverIfEqualToAnyOf = $<Kind.Pipe, [List.IncludesValue, NeverIf]>

// Given a tuple T, get all duplicate values excluding the value 0.
type DuplicatesExcludingZero = $<
  Kind.Pipe,
  [List.Duplicates, $<List.Remove, 0>]
>

// Given a tuple T, map all duplicate values to the value `never`.
type NeverIfDuplicate = $<
  Kind.Pipe,
  [
    $<
      Kind.Juxt,
      [
        $<Kind.Pipe, [DuplicatesExcludingZero, NeverIfEqualToAnyOf]>,
        Function.Identity
      ]
    >,
    $<Kind.Uncurry, List.Map>
  ]
>

// Mask duplicate values to never for each row.
type ValidateRows = $<List.Map, NeverIfDuplicate>

// Mask duplicate values to never for each column.
type ValidateColumns = $<
  Kind.PipeWeak,
  [Matrix.Columns, ValidateRows, Matrix.Columns]
>

// Given a list of nine 3x3 boxes, combine them into a matrix.
type BuildFromBoxes = $<
  Kind.Pipe,
  [
    $<List.Map, $<List.Chunk, 3>>,
    $<List.Chunk, 3>,
    Matrix.Columns,
    Matrix.Combine
  ]
>

// Get all nine 3x3 boxes from a Sudoku puzzle.
type GetBoxes = $<
  Kind.Pipe,
  [$<$<Matrix.Chunk, 3>, 3>, $<List.Map, $<List.FlattenN, 1>>]
>

// Mask duplicate values to never for each 3x3 box.
type ValidateBoxes = $<Kind.PipeWeak, [GetBoxes, ValidateRows, BuildFromBoxes]>

// Given a list of rows, intersect each element pairwise.
type IntersectRows = $<
  Kind.Pipe,
  [Matrix.Columns, $<List.Map, Type.IntersectAll>]
>

// Given a list of matrices, intersect each element pairwise.
type IntersectMatrices = $<
  Kind.Pipe,
  [Matrix.Columns, $<List.Map, IntersectRows>]
>

/**
 * Given a 9x9 grid of numbers, mask out all invalid Sudoku places to 'never'.
 */
export type MaskInvalidSudokuPlaces = $<
  Kind.Pipe,
  [
    $<Kind.Juxt, [ValidateRows, ValidateColumns, ValidateBoxes]>,
    IntersectMatrices
  ]
>
