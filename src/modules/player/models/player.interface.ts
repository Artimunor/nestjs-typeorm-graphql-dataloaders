import { Field, Int, ObjectType } from 'type-graphql';

import { Club } from '../../club/models/club.interface';
import { Country } from '../../country/models/country.interface';

@ObjectType()
export class Player {
  @Field(() => Int)
  playerId: number;

  @Field()
  name: string;

  @Field()
  position: string;

  @Field(() => Int)
  shirtNumber: number;

  @Field(() => Country)
  country: Country;

  @Field(() => [Club])
  clubs: Club[];
}
