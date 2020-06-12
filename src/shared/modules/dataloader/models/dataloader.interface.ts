import * as Dataloader from 'dataloader';

import { Club } from '../../../../modules/club/models/club.interface';
import { Country } from '../../../../modules/country/models/country.interface';
import { Player } from '../../../../modules/player/models/player.interface';

export interface IDataloader {
  countryLoader: Dataloader<number, Country[]>;
  playerClubsLoader: Dataloader<number, Club[]>;
  clubPlayersLoader: Dataloader<number, Player[]>;
  countryPlayersLoader: Dataloader<number, Player[]>;
  countryClubsLoader: Dataloader<number, Club[]>;
}

export interface ILoaderData<T> {
  key: number;
  select: Array<keyof T>;
}
