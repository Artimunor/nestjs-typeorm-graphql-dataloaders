import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { DatabaseError } from '../../shared/errors/database.error';
import { IBatchArgs, IFindAllArgs, IFindOneArgs } from '../../shared/types/CRUD-args.interface';
import { ClubWhereInput } from './dto/club-where-input';
import { ClubWhereUniqueInput } from './dto/club-where-unique-input';
import { ClubEntity } from './models/club.entity';
import { Club } from './models/club.interface';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(ClubEntity)
    private readonly clubRepository: Repository<ClubEntity>,
  ) {}

  public findAll = async ({
    where,
    select,
    relations,
    take,
  }: IFindAllArgs<Club, ClubWhereInput>): Promise<Club[]> => {
    try {
      const clubs = await this.clubRepository.find({
        where: { ...where },
        take,
        select,
        relations,
      });
      return (clubs as any) as Club[];
    } catch (error) {
      throw new DatabaseError();
    }
  };

  public findOne = async ({
    where,
    select,
    relations,
  }: IFindOneArgs<Club, ClubWhereUniqueInput>): Promise<Club | undefined> => {
    try {
      const club = await this.clubRepository.findOne({
        where: { ...where },
        select,
        relations,
      });
      return club ? ((club as any) as Club) : undefined;
    } catch (error) {
      throw new DatabaseError();
    }
  };

  public batch = async ({ keys, select, relations }: IBatchArgs<Club, number>): Promise<Club[]> => {
    try {
      const clubs = await this.clubRepository.find({
        where: { clubId: In(keys) },
        select,
        relations,
      });
      return (clubs as any) as Club[];
    } catch (error) {
      throw new DatabaseError();
    }
  };

  public batchByCountry = async ({
    keys,
    select,
    relations,
  }: IBatchArgs<Club, number>): Promise<Club[]> => {
    try {
      const clubs = await this.clubRepository.find({
        where: { countryId: In(keys) },
        select: select ? [...new Set([...select, ...ClubEntity.requiredKeys])] : undefined,
        relations,
      });
      return (clubs as any) as Club[];
    } catch (error) {
      throw new DatabaseError();
    }
  };
}
