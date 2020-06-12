import { IBatchArgs } from '../../../types/CRUD-args.interface';

export interface IDataloaderArgs<K, E> {
  batch: (args: IBatchArgs<E, K>) => Promise<E[]>;
  filterBy: string;
}

export interface IManyDataloaderArgs<K, E> extends IDataloaderArgs<K, E> {
  resolveProperty: keyof E;
  relations: string[];
}
