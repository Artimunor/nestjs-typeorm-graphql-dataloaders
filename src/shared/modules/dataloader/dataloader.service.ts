import { Injectable } from '@nestjs/common';
import * as Dataloader from 'dataloader';

import { ClubService } from '../../../modules/club/club.service';
import { Club } from '../../../modules/club/models/club.interface';
import { CountryService } from '../../../modules/country/country.service';
import { Country } from '../../../modules/country/models/country.interface';
import { Player } from '../../../modules/player/models/player.interface';
import { PlayerService } from '../../../modules/player/player.service';
import { generateOneToManyMap, generateManyToManyMap } from './dataloader.helper';
import { IDataloaderArgs, IManyDataloaderArgs } from './models/dataloader-args.interface';
import { IDataloader } from './models/dataloader.interface';

@Injectable()
export class DataloaderService {
  constructor(
    private readonly countryService: CountryService,
    private readonly playerService: PlayerService,
    private readonly clubService: ClubService,
  ) {}

  public generateDataloaders(): IDataloader {
    return {
      countryLoader: this.oneToMany<number, Country>({
        batch: this.countryService.batch,
        groupBy: 'countryId',
      }),
      playerClubsLoader: this.manyToMany<number, Player, Club>({
        batch: this.playerService.batch,
        groupBy: 'playerId',
        resolveKey: 'clubs',
        relations: ['clubs'],
      }),
      clubPlayersLoader: this.manyToMany<number, Club, Player>({
        batch: this.clubService.batch,
        groupBy: 'clubId',
        resolveKey: 'players',
        relations: ['players'],
      }),
      countryPlayersLoader: this.oneToMany<number, Player>({
        batch: this.playerService.batchByCountry,
        groupBy: 'countryId',
      }),
      countryClubsLoader: this.oneToMany<number, Club>({
        batch: this.clubService.batchByCountry,
        groupBy: 'countryId',
      }),
    };
  }

  private oneToMany<K, E>({ batch, groupBy }: IDataloaderArgs<K, E>): Dataloader<K, E[]> {
    return new Dataloader(
      async (keys: K[]) => {
        const response = await batch({ keys });
        const map = generateOneToManyMap<K, E>(groupBy, response);
        return keys.map((key: K) => map.has(key) ? [...map.get(key)] : []);
      },
      { cache: false },
    );
  }

  private manyToMany<K, E, E2>({
    batch,
    groupBy,
    resolveKey,
    relations,
    select,
  }: IManyDataloaderArgs<K, E>): Dataloader<K, E2[]> {
    return new Dataloader(async (keys: K[]) => {
      const response = await batch({ keys, relations, select });
      const map = generateManyToManyMap<K, E, E2>(groupBy, resolveKey as string, response);
      return keys.map((key: K) => map.has(key) ? [...map.get(key)] : []);
    });
  }
}
