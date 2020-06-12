import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class PlayerWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  playerId?: number;
}
