import { Min } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';

import { ClubWhereInput } from './club-where-input';

@ArgsType()
export class ClubsArgs {
  @Field(() => ClubWhereInput, { nullable: true })
  where: ClubWhereInput = {};

  @Field(() => Int, { nullable: true })
  @Min(1)
  take: number;
}
