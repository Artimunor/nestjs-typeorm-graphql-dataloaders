import { Args, Context, Query, Resolver, ResolveProperty, Root } from '@nestjs/graphql';

import { NotFoundError } from '../../shared/errors/not-found.error';
import { IGraphQLContext } from '../../shared/modules/graphql/interfaces/graphql-context.interface';
import { Club } from '../club/models/club.interface';
import { Player } from '../player/models/player.interface';
import { CountryService } from './country.service';
import { CountriesArgs } from './dto/countries-args';
import { CountryWhereUniqueInput } from './dto/country-where-unique-input';
import { CountryEntity } from './models/country.entity';
import { Country } from './models/country.interface';

@Resolver(() => Country)
export class CountryResolver {
  constructor(private readonly countryService: CountryService) {}

  @Query(() => Country, { name: 'country' })
  public async getCountry(@Args('where') where: CountryWhereUniqueInput): Promise<Country> {
    const country = await this.countryService.findOne({ where });

    if (country) {
      return country;
    }
    throw new NotFoundError('Country', where);
  }

  @Query(() => [Country], { name: 'countries' })
  public getCountries(@Args() { take, where }: CountriesArgs): Promise<Country[]> {
    return this.countryService.findAll({ where, take });
  }

  @ResolveProperty(() => [Player])
  public players(
    @Root() country: CountryEntity,
    @Context() { dataloader: { countryPlayersLoader } }: IGraphQLContext,
  ): Promise<Player[]> {
    return countryPlayersLoader.load(country.countryId);
  }

  @ResolveProperty(() => [Club])
  public clubs(
    @Root() country: CountryEntity,
    @Context() { dataloader: { countryClubsLoader } }: IGraphQLContext,
  ): Promise<Club[]> {
    return countryClubsLoader.load(country.countryId);
  }
}
