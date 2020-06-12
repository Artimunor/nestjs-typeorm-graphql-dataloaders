import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CountryWhereInput {
  @Length(1, 25)
  @Field({ nullable: true })
  name?: string;
}
