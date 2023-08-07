import { $, Test, Parser } from '..'

type Sequence_Spec = [
  /**
   * If we have a parser "hello" "world", we can match "helloworld".
   */
  Test.Expect<
    $<
      $<
        Parser.Sequence,
        [$<Parser.String, 'hello'>, $<Parser.String, 'world'>]
      >,
      { input: 'helloworld'; index: 0; result: never }
    >,
    { input: 'helloworld'; index: 10; result: ['hello', 'world'] }
  >,

  /**
   * If we have a parser "hello" "world", matching "hello" will result in never.
   */
  Test.Expect<
    $<
      $<
        Parser.Sequence,
        [$<Parser.String, 'hello'>, $<Parser.String, 'world'>]
      >,
      { input: 'hello'; index: 0; result: never }
    >,
    never
  >
]

type WeatherString = $<Parser.String, 'Weather'>

type TimeString = $<
  Parser.Sequence,
  [
    $<Parser.String, '('>,
    $<
      Parser.Choice,
      [$<Parser.String, 'today'>, $<Parser.String, 'yesterday'>]
    >,
    $<Parser.String, ')'>
  ]
>

type WeatherType = $<
  Parser.Choice,
  [$<Parser.String, 'Sunny'>, $<Parser.String, 'Cloudy'>]
>

type FullParser = $<
  Parser.Sequence,
  [
    WeatherString,
    $<Parser.String, ' '>,
    TimeString,
    $<Parser.String, ': '>,
    WeatherType
  ]
>

type FullParser_Spec = [
  /**
   * If we have a parser "Weather (today): Sunny", we can match "Weather (today)
   * : Sunny".
   */
  Test.Expect<
    $<FullParser, { input: 'Weather (today): Sunny'; index: 0; result: never }>,
    {
      input: 'Weather (today): Sunny'
      index: 22
      result: ['Weather', ' ', ['(', 'today', ')'], ': ', 'Sunny']
    }
  >
]
