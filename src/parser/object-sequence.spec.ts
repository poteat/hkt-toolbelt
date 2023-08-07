import { $, Test, Parser, Object } from '..';

type ObjectSequence_Spec = [
  /**
   * Can generate an object from a tagged sequence of parsers.
   */
  Test.Expect<
    $<
      $<
        Parser.Run,
        $<
          Parser.ObjectSequence,
          [
            ['foo', $<Parser.String, 'hello'>],
            $<Parser.String, ' '>,
            ['bar', $<Parser.String, 'world'>]
          ]
        >
      >,
      'hello world'
    >,
    { foo: 'hello'; bar: 'world' }
  >
];

type WeatherString = $<Parser.String, 'Weather'>;

type TimeString = $<
  $<Parser.Map, $<Object.At, 'time'>>,
  $<
    Parser.ObjectSequence,
    [
      $<Parser.String, '('>,
      [
        'time',
        $<
          Parser.Choice,
          [$<Parser.String, 'today'>, $<Parser.String, 'yesterday'>]
        >
      ],
      $<Parser.String, ')'>
    ]
  >
>;

type WeatherType = $<
  Parser.Choice,
  [$<Parser.String, 'Sunny'>, $<Parser.String, 'Cloudy'>]
>;

type FullParser = $<
  Parser.Run,
  $<
    Parser.ObjectSequence,
    [
      WeatherString,
      $<Parser.String, ' '>,
      ['time', TimeString],
      $<Parser.String, ': '>,
      ['weather', WeatherType]
    ]
  >
>;

type FullParser_Spec = [
  /**
   * If we have a parser "Weather (today): Sunny", we can match "Weather (today)
   * : Sunny".
   */
  Test.Expect<
    $<FullParser, 'Weather (today): Sunny'>,
    { time: 'today'; weather: 'Sunny' }
  >
];
