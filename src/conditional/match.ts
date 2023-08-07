import {
  $,
  $$,
  $N,
  Kind,
  Function,
  Conditional,
  List,
  Object,
  String,
  Test,
} from "..";

interface LocationSchema {
  city: string
  country: string
  postcode: number | string
  coordinates: {
    latitude: `${"-" | ""}${number}.${number}`
    longitude: `${"-" | ""}${number}.${number}`
  }
  timezone: {
    offset: `${"+" | "-"}${number}:${0 | 3}0`
    description?: string
  }
}

type RawResponses = [
  {
    city: "Amiens"
    country: "France"
    postcode: "^$�deY�8V�"
    coordinates: { latitude: "�`y�xe��Բ"; longitude: "173.1494" }
    timezone: { offset: "�[-no�F�>~�A"; description: "Adelaide, Darwin" }
  },
  {
    city: "Summerside"
    country: "Canada"
    postcode: "V8E 7Q2"
    coordinates: { latitude: "-72.1531"; longitude: "-155.1383" }
    timezone: { offset: "-4:00" }
  },
  {
    city: "Essertines-sur-Yverdon"
    country: "Switzerland"
    postcode: 3045
    coordinates: { latitude: "-57.5622"; longitude: "75.3632" }
    timezone: { offset: "-4:00" }
  },
  {
    status: "403"
    source: { pointer: "/data/attributes/secretPowers" }
    detail: "Editing secret powers is not authorized on Sundays."
  },
  {
    city: "Sviland"
    country: "Norway"
    postcode: "1215"
    coordinates: { latitude: "38.6709"; longitude: "95.1991" }
    timezone: { offset: "+3:30"; description: "Tehran" }
  },
  {
    status: "500"
    source: { pointer: "/data/attributes/reputation" }
    title: "The backend responded with an error"
    detail: "Reputation service not responding after three requests."
  }
];

type ValidResponses = [
  {
    city: "Summerside"
    country: "Canada"
    postcode: "V8E 7Q2"
    coordinates: { latitude: "-72.1531"; longitude: "-155.1383" }
    timezone: { offset: "-4:00" }
  },
  {
    city: "Essertines-sur-Yverdon"
    country: "Switzerland"
    postcode: 3045
    coordinates: { latitude: "-57.5622"; longitude: "75.3632" }
    timezone: { offset: "-4:00" }
  },
  {
    city: "Sviland"
    country: "Norway"
    postcode: "1215"
    coordinates: { latitude: "38.6709"; longitude: "95.1991" }
    timezone: { offset: "+3:30"; description: "Tehran" }
  }
];

type ExtendsSchema = $<Conditional.Extends, LocationSchema>;

type _ = [
  Test.Expect<
    $N<List.Every, [ExtendsSchema, RawResponses]>,
    false
  >,

  Test.Expect<
    $N<List.Filter, [ExtendsSchema, RawResponses]>, 
    ValidResponses
  >,

  Test.Expect<
    $$<
      [
        $<List.Filter, ExtendsSchema>,  // ValidResponses

        Kind.Apply,  // $<Kind.Apply, ValidResponses>
        List.Map,    // $<List.Map, $<Kind.Apply, ValidResponses>>

        $<Kind.Apply, 
          $N<List.Map, [
            List.Map, 
            [$<Object.At, "city">, $<Object.At, "country">]
          ]>  // $<Kind.Apply, [$<List.Map, $<Object.At, "city">>, $<List.Map, $<Object.At, "country">>]>
        >,  //  $N<List.Map, [$<Kind.Apply, ValidResponses>, $<Kind.Apply, [$<List.Map, $<Object.At, "city">>, $<List.Map, $<Object.At, "country">>]>]>
        // [["Summerside", "Essertines-sur-Yverdon", "Sviland"], ["Canada", "Switzerland", "Norway"]]

        List.Zip, // [["Summerside", "Canada"], ["Essertines-sur-Yverdon", "Switzerland"], ["Sviland", "Norway"]]

        $<List.Map, $<String.Join, ", ">>,  // ["Summerside, Canada", "Essertines-sur-Yverdon, Switzerland", "Sviland, Norway"]

        // $<$<List.Reduce, String.FromList>, "">
      ],
      RawResponses
    >,
    ["Summerside, Canada", "Essertines-sur-Yverdon, Switzerland", "Sviland, Norway"]
    // "Summerside, Canada; Essertines-sur-Yverdon, Switzerland; Sviland, Norway; "
  >
];
