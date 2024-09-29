import { $, Boolean, Conditional, Function, Kind, List, Matrix } from '..'

type HasAllUniqueElements = $<
  Kind.Pipe,
  [List.Duplicates, List.Length, $<Conditional.Equals, 0>]
>

type HasAllUniqueElementsExcludingZero = $<
  Kind.Pipe,
  [$<List.Filter, $<Conditional.NotEquals, 0>>, HasAllUniqueElements]
>

type LengthIsNine = $<Kind.Pipe, [List.Length, $<Conditional.Equals, 9>]>

type IsValidSet = $<
  Kind.Pipe,
  [
    $<Kind.Juxt, [HasAllUniqueElementsExcludingZero, LengthIsNine]>,
    Boolean.AndAll
  ]
>

type GetRows = Function.Identity

type GetColumns = Matrix.Columns

type GetBoxes = $<
  Kind.Pipe,
  [$<$<Matrix.Chunk, 3>, 3>, $<List.Map, $<List.FlattenN, 1>>]
>

/**
 * A type-level function that checks if a given 2D array is a valid Sudoku
 * puzzle.
 *
 * A Sudoku puzzle is a 9x9 grid of numbers where each row, column, and 3x3 box
 * contains the numbers 1-9 exactly once.
 *
 * The number 0 represents an uncompleted cell, which is considered valid.
 *
 * @template T - The 2D array to check.
 */
export type IsValidSudoku = $<
  Kind.Pipe,
  [
    $<Kind.Juxt, [GetRows, GetColumns, GetBoxes]>,
    $<List.FlattenN, 1>,
    $<List.Map, IsValidSet>,
    Boolean.AndAll
  ]
>
