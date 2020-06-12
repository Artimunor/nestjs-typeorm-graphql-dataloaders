import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ClubEntity } from '../../club/models/club.entity';
import { CountryEntity } from '../../country/models/country.entity';

@Entity('Player')
export class PlayerEntity {
  public static requiredKeys: Array<keyof PlayerEntity> = ['playerId'];

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'PlayerId',
  })
  public playerId: number;

  @Column('varchar', {
    name: 'Name',
    length: 25,
  })
  public name: string;

  @Column('varchar', {
    name: 'Position',
    length: 15,
  })
  public position: string;

  @Column('int', {
    name: 'ShirtNumber',
  })
  public shirtNumber: number;

  @Column('int', {
    name: 'CountryId',
  })
  public countryId: number;

  @ManyToOne(() => CountryEntity, (country) => country.players)
  @JoinColumn({ name: 'CountryId' })
  public country: CountryEntity;

  @ManyToMany(() => ClubEntity, { nullable: false, cascade: true })
  @JoinTable({
    name: 'PlayerClub',
    joinColumn: {
      name: 'PlayerId',
      referencedColumnName: 'playerId',
    },
    inverseJoinColumn: {
      name: 'ClubId',
      referencedColumnName: 'clubId',
    },
  })
  public clubs: ClubEntity[];
}
