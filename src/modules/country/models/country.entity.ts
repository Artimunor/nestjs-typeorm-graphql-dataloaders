import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ClubEntity } from '../../club/models/club.entity';
import { PlayerEntity } from '../../player/models/player.entity';

@Entity('Country')
export class CountryEntity {
  public static requiredKeys: Array<keyof CountryEntity> = ['countryId'];

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'CountryId',
  })
  public countryId: number;

  @Column('varchar', {
    name: 'Name',
    length: 25,
  })
  public name: string;

  @OneToMany(() => PlayerEntity, (player) => player.country)
  players: PlayerEntity[];

  @OneToMany(() => ClubEntity, (club) => club.country)
  clubs: PlayerEntity[];
}
