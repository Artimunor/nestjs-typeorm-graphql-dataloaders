import { Injectable } from '@nestjs/common';
import * as Dataloader from 'dataloader';

import { ClubService } from '../../../modules/club/club.service';
import { Club } from '../../../modules/club/models/club.interface';
import { CountryService } from '../../../modules/country/country.service';
import { Country } from '../../../modules/country/models/country.interface';
import { Player } from '../../../modules/player/models/player.interface';
import { PlayerService } from '../../../modules/player/player.service';
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
        filterBy: 'countryId',
      }),
      playerClubsLoader: this.manyToMany<number, Player, Club>({
        batch: this.playerService.batch,
        filterBy: 'playerId',
        resolveProperty: 'clubs',
        relations: ['clubs'],
      }),
      clubPlayersLoader: this.manyToMany<number, Club, Player>({
        batch: this.clubService.batch,
        filterBy: 'clubId',
        resolveProperty: 'players',
        relations: ['players'],
      }),
      countryPlayersLoader: this.oneToMany<number, Player>({
        batch: this.playerService.batchByCountry,
        filterBy: 'countryId',
      }),
      countryClubsLoader: this.oneToMany<number, Club>({
        batch: this.clubService.batchByCountry,
        filterBy: 'countryId',
      }),
    };
  }

  private oneToMany<K, E>({ batch, filterBy }: IDataloaderArgs<K, E>): Dataloader<K, E[]> {
    return new Dataloader(
      async (keys: K[]) => {
        const response = await batch({ keys });
        return keys.map((value: K) => response.filter((row: E) => row[filterBy] === value));
      },
      { cache: false },
    );
  }

  private manyToMany<K, E, E2>({
    batch,
    filterBy,
    resolveProperty,
    relations,
  }: IManyDataloaderArgs<K, E>): Dataloader<K, E2[]> {
    return new Dataloader(async (keys: K[]) => {
      const response = await batch({ keys, relations });
      return keys.map((key: K) =>
        response.reduce(
          (rows: E2[], row: any) =>
            row[filterBy] === key ? rows.concat(row[resolveProperty]) : rows,
          [],
        ),
      );
    });
  }
}
