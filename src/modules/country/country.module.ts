import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CountryResolver } from './country.resolver';
import { CountryService } from './country.service';
import { CountryEntity } from './models/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity])],
  providers: [CountryResolver, CountryService],
  exports: [CountryService],
})
export class CountryModule {}
