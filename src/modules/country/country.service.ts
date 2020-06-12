import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { DatabaseError } from '../../shared/errors/database.error';
import { IBatchArgs, IFindAllArgs, IFindOneArgs } from '../../shared/types/CRUD-args.interface';
import { CountryWhereInput } from './dto/country-where-input';
import { CountryWhereUniqueInput } from './dto/country-where-unique-input';
import { CountryEntity } from './models/country.entity';
import { Country } from './models/country.interface';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>,
  ) {}

  public findAll = async ({
    where,
    select,
    relations,
    take,
  }: IFindAllArgs<Country, CountryWhereInput>): Promise<Country[]> => {
    try {
      const countries = await this.countryRepository.find({
        where: { ...where },
        take,
        select,
        relations,
      });
      return (countries as any) as Country[];
    } catch (error) {
      throw new DatabaseError();
    }
  };

  public findOne = async ({
    where,
    select,
    relations,
  }: IFindOneArgs<Country, CountryWhereUniqueInput>): Promise<Country | undefined> => {
    try {
      const country = await this.countryRepository.findOne({
        where: { ...where },
        select,
        relations,
      });
      return country ? ((country as any) as Country) : undefined;
    } catch (error) {
      throw new DatabaseError();
    }
  };

  public batch = async ({
    keys,
    select,
    relations,
  }: IBatchArgs<Country, number>): Promise<Country[]> => {
    try {
      const countries = await this.countryRepository.find({
        where: { countryId: In(keys) },
        select: select ? [...new Set([...select, ...CountryEntity.requiredKeys])] : undefined,
        relations: relations ? relations : undefined,
      });
      return (countries as any) as Country[];
    } catch (error) {
      throw new DatabaseError();
    }
  };
}
