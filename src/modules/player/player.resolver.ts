import { Args, Context, Query, Resolver, ResolveProperty, Root } from '@nestjs/graphql';

import { NotFoundError } from '../../shared/errors/not-found.error';
import { IGraphQLContext } from '../../shared/modules/graphql/interfaces/graphql-context.interface';
import { Club } from '../club/models/club.interface';
import { Country } from '../country/models/country.interface';
import { PlayerWhereUniqueInput } from './dto/player-where-unique-input';
import { PlayersArgs } from './dto/players-args';
import { PlayerEntity } from './models/player.entity';
import { Player } from './models/player.interface';
import { PlayerService } from './player.service';

@Resolver(() => Player)
export class PlayerResolver {
  constructor(private readonly playerService: PlayerService) {}

  @Query(() => Player, { name: 'player' })
  public async getPlayer(@Args('where') where: PlayerWhereUniqueInput): Promise<Player> {
    const player = await this.playerService.findOne({ where });

    if (player) {
      return player;
    }
    throw new NotFoundError('Player', where);
  }

  @Query(() => [Player], { name: 'players' })
  public getPlayers(@Args() { take, where }: PlayersArgs): Promise<Player[]> {
    return this.playerService.findAll({ where, take });
  }

  @ResolveProperty(() => Country)
  public async country(
    @Root() player: PlayerEntity,
    @Context() { dataloader: { countryLoader } }: IGraphQLContext,
  ): Promise<Country | null> {
    const countries = await countryLoader.load(player.countryId);
    return countries.shift();
  }

  @ResolveProperty(() => [Club])
  public clubs(
    @Root() player: PlayerEntity,
    @Context() { dataloader: { playerClubsLoader } }: IGraphQLContext,
  ): Promise<Club[]> {
    return playerClubsLoader.load(player.playerId);
  }
}
