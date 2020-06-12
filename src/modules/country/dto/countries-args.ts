import { Min } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';

import { CountryWhereInput } from './country-where-input';

@ArgsType()
export class CountriesArgs {
  @Field(() => CountryWhereInput, { nullable: true })
  where: CountryWhereInput = {};

  @Field(() => Int, { nullable: true })
  @Min(1)
  take: number;
}
