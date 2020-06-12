import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { DatabaseError } from '../../shared/errors/database.error';
import { IBatchArgs, IFindAllArgs, IFindOneArgs } from '../../shared/types/CRUD-args.interface';
import { PlayerWhereInput } from './dto/player-where-input';
import { PlayerWhereUniqueInput } from './dto/player-where-unique-input';
import { PlayerEntity } from './models/player.entity';
import { Player } from './models/player.interface';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(PlayerEntity)
    private readonly playerRepository: Repository<PlayerEntity>,
  ) {}

  public findAll = async ({
    where,
    select,
    relations,
    take,
  }: IFindAllArgs<Player, PlayerWhereInput>): Promise<Player[]> => {
    try {
      const players = await this.playerRepository.find({
        where: { ...where },
        take,
        select,
        relations,
      });
      return (players as any) as Player[];
    } catch (error) {
      throw new DatabaseError();
    }
  };

  public findOne = async ({
    where,
    select,
    relations,
  }: IFindOneArgs<Player, PlayerWhereUniqueInput>): Promise<Player | undefined> => {
    try {
      const player = await this.playerRepository.findOne({
        where: { ...where },
        select,
        relations,
      });
      return player ? ((player as any) as Player) : undefined;
    } catch (error) {
      throw new DatabaseError();
    }
  };

  public batch = async ({
    keys,
    select,
    relations,
  }: IBatchArgs<Player, number>): Promise<Player[]> => {
    try {
      const players = await this.playerRepository.find({
        where: { playerId: In(keys) },
        select: select ? [...new Set([...select, ...PlayerEntity.requiredKeys])] : undefined,
        relations,
      });
      return (players as any) as Player[];
    } catch (error) {
      throw new DatabaseError();
    }
  };

  public batchByCountry = async ({
    keys,
    select,
    relations,
  }: IBatchArgs<Player, number>): Promise<Player[]> => {
    try {
      const players = await this.playerRepository.find({
        where: { countryId: In(keys) },
        select: select ? [...new Set([...select, ...PlayerEntity.requiredKeys])] : undefined,
        relations,
      });
      return (players as any) as Player[];
    } catch (error) {
      throw new DatabaseError();
    }
  };
}
