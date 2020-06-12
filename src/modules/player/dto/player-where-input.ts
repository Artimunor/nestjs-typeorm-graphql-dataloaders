import { Length, Min } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class PlayerWhereInput {
  @Length(1, 25)
  @Field({ nullable: true })
  name?: string;

  @Length(1, 15)
  @Field({ nullable: true })
  position?: string;

  @Min(0)
  @Field(() => Int, { nullable: true })
  shirtNumber?: number;
}
