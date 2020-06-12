import { FindConditions } from 'typeorm';

export interface IBatchArgs<E, K> {
  keys: K[];
  select?: Array<keyof E>;
  relations?: string[];
}

export interface IFindAllArgs<E, W> {
  where: W;
  select?: Array<keyof E>;
  relations?: string[];
  take?: number;
}

export interface IFindOneArgs<E, W> {
  where: FindConditions<W>;
  select?: Array<keyof E>;
  relations?: string[];
}
