import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { typeOrmEntities } from './type-orm-entitites';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        database: configService.get('DB_NAME'),
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        synchronize: false,
        logging: !configService.isProd,
        entities: typeOrmEntities,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class TypeormModule {}
