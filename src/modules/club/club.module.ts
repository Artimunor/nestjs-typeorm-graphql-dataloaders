import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClubResolver } from './club.resolver';
import { ClubService } from './club.service';
import { ClubEntity } from './models/club.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClubEntity])],
  providers: [ClubResolver, ClubService],
  exports: [ClubService],
})
export class ClubModule {}
