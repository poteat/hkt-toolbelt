import { $, Test, String, Stress } from ".."

type FromList_Spec = [
  /**
   * Can join 10 elements.
   */
  Test.Expect<$<String.FromList, Stress.TenTuple>, Stress.TenString>,

  /**
   * Can join 100 elements.
   */
  Test.Expect<$<String.FromList, Stress.HundredTuple>, Stress.HundredString>,

  /**
   * Can join 1000 elements.
   */
  Test.Expect<$<String.FromList, Stress.ThousandTuple>, Stress.ThousandString>
]
