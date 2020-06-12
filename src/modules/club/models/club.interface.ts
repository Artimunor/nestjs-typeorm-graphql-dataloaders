import { Field, Int, ObjectType } from 'type-graphql';

import { Country } from '../../country/models/country.interface';
import { Player } from '../../player/models/player.interface';

@ObjectType()
export class Club {
  @Field(() => Int)
  clubId: number;

  @Field()
  name: string;

  @Field(() => Country)
  country: Country;

  @Field(() => [Player])
  players: Player[];
}
