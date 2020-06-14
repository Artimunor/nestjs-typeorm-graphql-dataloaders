import { Args, Context, Query, Resolver, ResolveProperty, Root } from '@nestjs/graphql';

import { NotFoundError } from '../../shared/errors/not-found.error';
import { IGraphQLContext } from '../../shared/modules/graphql/interfaces/graphql-context.interface';
import { Country } from '../country/models/country.interface';
import { Player } from '../player/models/player.interface';
import { ClubService } from './club.service';
import { ClubWhereUniqueInput } from './dto/club-where-unique-input';
import { ClubsArgs } from './dto/clubs-args';
import { ClubEntity } from './models/club.entity';
import { Club } from './models/club.interface';

@Resolver(() => Club)
export class ClubResolver {
  constructor(private readonly clubService: ClubService) {}

  @Query(() => Club, { name: 'club' })
  public async getClub(@Args('where') where: ClubWhereUniqueInput): Promise<Club> {
    const club = await this.clubService.findOne({ where });

    if (club) {
      return club;
    }
    throw new NotFoundError('Club', where);
  }

  @Query(() => [Club], { name: 'clubs' })
  public getClubs(@Args() { take, where }: ClubsArgs): Promise<Club[]> {
    return this.clubService.findAll({ where, take });
  }

  @ResolveProperty(() => Country)
  public async country(
    @Root() club: ClubEntity,
    @Context() { dataloader: { countryLoader } }: IGraphQLContext,
  ): Promise<Country> {
    const countries = await countryLoader.load(club.countryId);
    return countries.shift();
  }

  @ResolveProperty(() => [Player])
  public players(
    @Root() club: ClubEntity,
    @Context() { dataloader: { clubPlayersLoader } }: IGraphQLContext,
  ): Promise<Player[]> {
    return clubPlayersLoader.load(club.clubId);
  }
}
