import { $, Test, Object } from "hkt-toolbelt"

type Paths_Spec = [
  /**
   * Can handle combinatorial structures.
   */
  Test.Expect<
    $<
      Object.Paths,
      {
        a: {
          aa: {
            aaa: string
            aab: string
          }
          ab: {
            aba: string
            abb: string
          }
        }
        b: {
          ba: {
            baa: string
            bab: string
          }
          bb: {
            bba: string
            bbb: string
          }
        }
      }
    >[number],
    [
      ["a"],
      ["a", "aa"],
      ["a", "aa", "aaa"],
      ["a", "aa", "aab"],
      ["a", "ab"],
      ["a", "ab", "aba"],
      ["a", "ab", "abb"],
      ["b"],
      ["b", "ba"],
      ["b", "ba", "baa"],
      ["b", "ba", "bab"],
      ["b", "bb"],
      ["b", "bb", "bba"],
      ["b", "bb", "bbb"]
    ][number]
  >
]
