import { Field, Int, ObjectType } from 'type-graphql';

import { Club } from '../../club/models/club.interface';
import { Player } from '../../player/models/player.interface';

@ObjectType()
export class Country {
  @Field(() => Int)
  countryId: number;

  @Field()
  name: string;

  @Field(() => [Player])
  players: Player[];

  @Field(() => [Club])
  clubs: Club[];
}
