import { IBatchArgs } from '../../../types/CRUD-args.interface';

export interface IDataloaderArgs<K, E> {
  batch: (args: IBatchArgs<E, K>) => Promise<E[]>;
  groupBy: string;
}

export interface IManyDataloaderArgs<K, E> extends IDataloaderArgs<K, E> {
  resolveKey: keyof E;
  relations: string[];
  select?: Array<keyof E>;
}
