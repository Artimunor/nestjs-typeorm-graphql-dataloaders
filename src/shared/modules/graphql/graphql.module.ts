import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { DataloaderModule } from '../dataloader/dataloader.module';
import { DataloaderService } from '../dataloader/dataloader.service';
import { IGraphQLContext } from './interfaces/graphql-context.interface';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [ConfigModule, DataloaderModule],
      useFactory: (configService: ConfigService, dataloaderService: DataloaderService) => ({
        autoSchemaFile: 'schema.gql',
        playground: configService.isDev || configService.isLocal,
        context: ({ req, res }): IGraphQLContext => ({
          req,
          res,
          dataloader: dataloaderService.generateDataloaders(),
        }),
      }),
      inject: [ConfigService, DataloaderService],
    }),
  ],
})
export class GraphqlModule {}
