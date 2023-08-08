import { $, Test, List } from '..'

type Range_Stress_Spec = [
  Test.Expect<$<$<$<List.Range, 0>, 4000>, 1>[3000], 3000>,

  Test.Expect<$<$<$<List.Range, 3000>, 0>, -1>[2950], 50>
]
