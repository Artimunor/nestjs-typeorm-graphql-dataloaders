import { Min } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';

import { PlayerWhereInput } from './player-where-input';

@ArgsType()
export class PlayersArgs {
  @Field(() => PlayerWhereInput, { nullable: true })
  where: PlayerWhereInput = {};

  @Field(() => Int, { nullable: true })
  @Min(1)
  take: number;
}
