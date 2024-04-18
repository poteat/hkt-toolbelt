import { $, Test, List } from '..'

type Range_Stress_Spec = [
  Test.Expect<$<$<$<List.Range, 0>, 1500>, 1>[1000], 1000>,
  Test.Expect<$<$<$<List.Range, 1000>, 0>, -1>[500], 500>
]
