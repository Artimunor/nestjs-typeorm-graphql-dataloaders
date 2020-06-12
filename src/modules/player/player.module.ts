import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayerEntity } from './models/player.entity';
import { PlayerResolver } from './player.resolver';
import { PlayerService } from './player.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerEntity])],
  providers: [PlayerResolver, PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}
