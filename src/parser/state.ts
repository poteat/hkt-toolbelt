import { Number } from '..';

export type _$state = {
  /**
   * The string to match on.
   */
  input: string;

  /**
   * The current index in the input string to begin matching.
   */
  index: Number.Number;

  /**
   * The result of the match.
   */
  result: unknown;
};
