import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class ClubWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  clubId?: number;
}
