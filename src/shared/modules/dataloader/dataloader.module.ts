import { Module } from '@nestjs/common';

import { ClubModule } from '../../../modules/club/club.module';
import { CountryModule } from '../../../modules/country/country.module';
import { PlayerModule } from '../../../modules/player/player.module';
import { DataloaderService } from './dataloader.service';

@Module({
  imports: [CountryModule, ClubModule, PlayerModule],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
