import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CountryEntity } from '../../country/models/country.entity';
import { PlayerEntity } from '../../player/models/player.entity';

@Entity('Club')
export class ClubEntity {
  public static requiredKeys: Array<keyof ClubEntity> = ['clubId'];

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'ClubId',
  })
  public clubId: number;

  @Column('varchar', {
    name: 'Name',
    length: 25,
  })
  public name: string;

  @Column('int', {
    name: 'CountryId',
  })
  public countryId: number;

  @ManyToOne(() => CountryEntity, (country) => country.clubs)
  @JoinColumn({ name: 'CountryId' })
  public country: CountryEntity;

  @ManyToMany(() => PlayerEntity, (player) => player.clubs)
  public players: PlayerEntity[];
}
