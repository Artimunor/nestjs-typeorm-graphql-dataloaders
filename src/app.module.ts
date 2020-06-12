import { Module } from '@nestjs/common';

import { ClubModule } from './modules/club/club.module';
import { CountryModule } from './modules/country/country.module';
import { PlayerModule } from './modules/player/player.module';
import { ConfigModule } from './shared/modules/config/config.module';
import { DataloaderModule } from './shared/modules/dataloader/dataloader.module';
import { GraphqlModule } from './shared/modules/graphql/graphql.module';
import { TypeormModule } from './shared/modules/type-orm/type-orm.module';

@Module({
  imports: [
    GraphqlModule,
    DataloaderModule,
    ConfigModule,
    TypeormModule,
    PlayerModule,
    CountryModule,
    ClubModule,
  ],
})
export class AppModule {}
