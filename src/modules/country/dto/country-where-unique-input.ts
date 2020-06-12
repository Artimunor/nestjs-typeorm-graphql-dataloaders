import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class CountryWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  countryId?: number;
}
