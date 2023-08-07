import { $, Kind, Type, List } from '..';

export type _$fromList<
  T extends List.List,
  FIRST = $<List.First, T>,
  REST extends List.List = $<List.Shift, T>,
  RESULT = T extends [] ? never : FIRST | _$fromList<REST>
> = RESULT;

export interface FromList extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], List.List>): _$fromList<typeof x>;
}
